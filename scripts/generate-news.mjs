#!/usr/bin/env node
/**
 * Builds public/api/news.md from two inputs.
 *
 * scripts/news/manual.md is the hand-written baseline: it keeps the curated
 * wording, the highlight taglines and the older entries exactly as a human
 * wrote them. This script never rewrites that file.
 *
 * The deepseek-harness releases API supplies entries for versions the baseline
 * does not cover yet, so a new release shows up on the feed without anyone
 * editing the page. Only the Chinese half of a release body is used, and the
 * generated text is plain changelog wording without editorial commentary.
 *
 * Output layout: the baseline header verbatim, then releases newest first. A
 * generated entry joins the baseline's block when the date already exists and
 * otherwise opens a new dated block in date order.
 *
 * The output is deterministic for the same inputs, so the hourly workflow can
 * skip the commit and Pages deploy when nothing changed.
 */
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const RELEASES_API =
  'https://api.github.com/repos/deepseek-ai/deepseek-harness/releases?per_page=100'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TARGET_PATH = resolve(REPO_ROOT, 'public/api/news.md')
const MANUAL_PATH = resolve(REPO_ROOT, 'scripts/news/manual.md')

/** Release pages to walk at most; pagination stops as soon as Link runs out. */
const MAX_PAGES = 10

const SECTION_ORDER = ['新增功能', '体验优化', '问题修复', '其他变更', 'SDK']

/** Section titles seen in release bodies, mapped to the canonical Chinese name. */
const SECTION_NAMES = new Map([
  ['新增功能', '新增功能'],
  ['新增', '新增功能'],
  ['体验优化', '体验优化'],
  ['优化', '体验优化'],
  ['问题修复', '问题修复'],
  ['修复', '问题修复'],
  ['其他变更', '其他变更'],
  ['调整', '其他变更'],
  ['SDK', 'SDK'],
])

const HAS_CJK = /[\u3400-\u9fff\uf900-\ufaff]/u

/** The first line of the English half, in any of the shapes used so far. */
const ENGLISH_SECTION_START =
  /^[ \t]*(?:<h[1-6]\b[^>]*id="(?:en|english)[^"]*"[^>]*>.*?<\/h[1-6]>|#{1,6}[ \t]*English\b[^\n]*)[ \t]*$/imu

/** English-only headings; seeing one in the Chinese half means the split failed. */
const ENGLISH_ONLY_HEADING =
  /^(?:<h[1-6][^>]*>\s*(?:New Features|Bug Fixes|Improvements|Chores|Other Changes)\s*<\/h[1-6]>|#{1,6}\s*(?:New Features|Bug Fixes|Improvements|Chores|Other Changes)\b)/imu

/** A heading that names one of the two language halves rather than a section. */
const LANGUAGE_MARKER =
  /^(?:中文|English)(?![\p{L}\p{N}])|(?:^|[·\s])(?:中文|English)$/iu

const DATE_HEADING = /^## (\d{4})\/(\d{2})\/(\d{2})\s*$/u
const VERSION_ENTRY = /^### DeepSeek Harness (\S+) 发布/u

const HANDLE = '@[A-Za-z0-9][A-Za-z0-9_-]*(?:\\.[A-Za-z0-9_-]+)*'
const ATTRIBUTION = `(${HANDLE}(?:\\s*,\\s*${HANDLE})*)`
/** Attribution requires whitespace before "@", so e-mail and URLs stay intact. */
const ATTRIBUTION_AT_END = new RegExp(
  `^(.*?)(?:\\s*(?:—|–|--)\\s*|\\s+by\\s+|\\s+)${ATTRIBUTION}\\s*$`,
  'u',
)

const UNKNOWN_HEADINGS = []

async function fetchReleases() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'dsh-plugins-site-news-generator',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  } else {
    console.warn('GITHUB_TOKEN is not set, using the rate-limited anonymous API')
  }

  const releases = new Map()
  let url = RELEASES_API
  for (let page = 0; page < MAX_PAGES; page += 1) {
    let response
    try {
      response = await fetch(url, { headers, signal: AbortSignal.timeout(30_000) })
    } catch (error) {
      throw new Error(`Failed to reach ${url}: ${error.message}`)
    }
    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining')
      const limit = remaining === null ? '' : ` (rate limit remaining: ${remaining})`
      throw new Error(`Failed to fetch ${url}: HTTP ${response.status}${limit}`)
    }

    const batch = await response.json()
    if (!Array.isArray(batch)) {
      throw new Error(`Unexpected response from ${url}: expected an array of releases`)
    }
    for (const release of batch) {
      if (release?.id !== undefined) releases.set(release.id, release)
    }

    const rawNext = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1]
    if (!rawNext) break
    if (new URL(rawNext).origin !== new URL(RELEASES_API).origin) {
      throw new Error(`Refusing to follow pagination off api.github.com: ${rawNext}`)
    }
    url = rawNext
  }

  return [...releases.values()]
}

/** Strips tags, emoji prefixes and parenthetical suffixes from a heading. */
function cleanHeading(raw) {
  return raw
    .replace(/<[^>]*>/gu, '')
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .replace(/[（(][^）)]*[）)]\s*$/u, '')
    .trim()
}

/**
 * Maps a section heading onto the canonical name, case-insensitively. Returns
 * null for language markers and for headings outside the release-note
 * vocabulary; the latter are collected so the workflow log shows what was
 * skipped instead of dropping the section silently.
 */
function canonicalSection(raw) {
  const name = cleanHeading(raw)
  if (!name) return null
  if (LANGUAGE_MARKER.test(name)) return null

  const direct = SECTION_NAMES.get(name)
  if (direct) return direct

  const lower = name.toLowerCase()
  for (const [key, value] of SECTION_NAMES) {
    if (key.toLowerCase() === lower) return value
  }
  UNKNOWN_HEADINGS.push(name)
  return null
}

/**
 * Moves the contributor handle from however the release spelled it ("— @a",
 * "by @a", "@a") to the feed's trailing " @a" form, and drops the trailing
 * sentence punctuation the feed does not use.
 */
function normalizeItem(raw) {
  let line = raw.trim().replace(/[。．]\s*$/u, '')
  let match = line.match(ATTRIBUTION_AT_END)
  if (!match && /\.\s*$/u.test(line)) {
    line = line.replace(/\.\s*$/u, '')
    match = line.match(ATTRIBUTION_AT_END)
  }

  let body = (match ? match[1] : line).replace(/[\s.。．]+$/u, '').trim()
  if (!body) return ''
  if (!match) return body

  const attribution = match[2].replace(/\s*,\s*/g, ', ')
  return `${body} ${attribution}`
}

function parseHeading(line) {
  return (
    line.match(/^<h[2-6][^>]*>(.*?)<\/h[2-6]>$/iu)?.[1] ??
    line.match(/^#{2,6}[ \t]+(.+)$/u)?.[1] ??
    null
  )
}

/** Splits one release body into the Chinese sections, dropping the English half. */
function readChineseSections(tagName, body) {
  const text = body.replace(/\r\n?/g, '\n')
  const englishStart = text.search(ENGLISH_SECTION_START)
  const chineseHalf = englishStart >= 0 ? text.slice(0, englishStart) : text

  if (englishStart < 0 && ENGLISH_ONLY_HEADING.test(text)) {
    throw new Error(
      `Release ${tagName}: the Chinese and English halves could not be split apart`,
    )
  }

  const sections = []
  const intro = []
  let current = null

  for (const rawLine of chineseHalf.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    if (/^\[(?:中文|English)\]/iu.test(line)) continue
    if (/^Full Changelog\b/u.test(line)) continue
    if (/^-{3,}$/u.test(line)) continue
    // Blockquotes in release bodies are announcements or asides, not changelog.
    if (/^>/u.test(line)) continue

    const rawHeading = parseHeading(line)
    if (rawHeading !== null) {
      const text = cleanHeading(rawHeading)
      if (LANGUAGE_MARKER.test(text)) {
        current = null
        continue
      }
      const name = canonicalSection(rawHeading)
      if (name) {
        current = { name, items: [] }
        sections.push(current)
      } else {
        current = null
      }
      continue
    }

    const bullet = line.match(/^(?:[-*+]|\d+[.)])\s+(.+)$/u)
    if (bullet) {
      if (current) current.items.push(normalizeItem(bullet[1]))
      continue
    }

    if (!current && HAS_CJK.test(line)) intro.push(line)
  }

  const merged = mergeSections(sections)
  const items = merged.flatMap((section) => section.items)
  if (items.length > 0 && !items.some((item) => HAS_CJK.test(item))) {
    throw new Error(`Release ${tagName}: parsed Chinese items contain no Chinese text`)
  }

  return { intro, sections: merged }
}

/** Merges repeated section names and puts them in the feed's fixed order. */
function mergeSections(sections) {
  const merged = new Map()
  for (const section of sections) {
    const items = merged.get(section.name) ?? []
    items.push(...section.items.filter(Boolean))
    merged.set(section.name, items)
  }

  const ordered = []
  for (const name of SECTION_ORDER) {
    const items = merged.get(name)
    if (items?.length) ordered.push({ name, items: dedupe(items) })
    merged.delete(name)
  }
  for (const [name, items] of merged) {
    if (items.length) ordered.push({ name, items: dedupe(items) })
  }
  return ordered
}

function dedupe(items) {
  return [...new Set(items)]
}

function formatVersion(tagName) {
  return tagName.replace(/^dsh-/u, '').replace(/^v/u, '')
}

function utcDate(publishedAt) {
  return publishedAt.slice(0, 10).replaceAll('-', '/')
}

/**
 * Splits the baseline into its verbatim header and its dated blocks, so new
 * entries can be slotted in without touching a single hand-written line.
 */
function parseManual(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n')

  const firstDate = lines.findIndex((line) => DATE_HEADING.test(line.trim()))
  const headerEnd = firstDate < 0 ? lines.length : firstDate
  const header = lines.slice(0, headerEnd).join('\n').replace(/\s+$/u, '')

  const blocks = []
  let current = null
  for (const rawLine of lines.slice(headerEnd)) {
    const line = rawLine.trimEnd()
    if (DATE_HEADING.test(line.trim())) {
      current = { date: line.trim().replace(/^## /u, ''), lines: [] }
      blocks.push(current)
      continue
    }
    if (current) current.lines.push(line)
  }

  for (const block of blocks) {
    block.body = block.lines.join('\n').replace(/^\n+/u, '').replace(/\s+$/u, '')
    delete block.lines
  }
  return { header, blocks }
}

/** Versions the baseline already covers, so they are never regenerated. */
function coveredVersions(blocks) {
  const versions = new Set()
  for (const block of blocks) {
    for (const line of block.body.split('\n')) {
      const match = line.trim().match(VERSION_ENTRY)
      if (match) versions.add(match[1])
    }
  }
  return versions
}

/** Renders one release as a plain entry, without editorial commentary. */
function renderReleaseEntry(release) {
  const lines = [`### DeepSeek Harness ${release.version} 发布`, '']
  if (release.intro.length) lines.push(release.intro.join('\n\n'), '')
  if (release.sections.length === 0) {
    lines.push('详见 GitHub 发布记录。', '')
  }
  for (const section of release.sections) {
    lines.push(`#### ${section.name}`, '')
    for (const item of section.items) lines.push(`- ${item}`)
    lines.push('')
  }
  return lines.join('\n').trimEnd()
}

/** Builds the entries for releases the baseline does not cover yet. */
function buildPendingEntries(releases, covered) {
  const pending = releases
    .filter((release) => !release.draft && release.published_at && release.body)
    .map((release) => ({
      version: formatVersion(release.tag_name),
      date: utcDate(release.published_at),
      publishedAt: release.published_at,
      ...readChineseSections(release.tag_name, release.body),
    }))
    .filter((release) => {
      if (covered.has(release.version)) return false
      if (release.sections.length > 0) return true
      console.warn(`Release ${release.version} has no recognized Chinese section, skipped`)
      return false
    })
    .sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
    )

  return pending
}

/** Merges generated entries into the baseline blocks, newest first. */
function mergeEntries(blocks, pending) {
  const dated = blocks.map((block) => ({ date: block.date, body: block.body }))
  const byDate = new Map(dated.map((block) => [block.date, block]))

  for (const release of pending) {
    const entry = renderReleaseEntry(release)
    const existing = byDate.get(release.date)
    if (existing) {
      // Same day as a curated block: the new release belongs at its top.
      existing.body = existing.body ? `${entry}\n\n${existing.body}` : entry
      continue
    }
    const block = { date: release.date, body: entry }
    dated.push(block)
    byDate.set(release.date, block)
  }

  const order = (date) => date.split('/').join('')
  return dated.sort((a, b) => (order(a.date) < order(b.date) ? 1 : order(a.date) > order(b.date) ? -1 : 0))
}

function render(header, blocks) {
  const body = blocks
    .filter((block) => block.body.trim())
    .map((block) => `## ${block.date}\n\n${block.body.trim()}`)
    .join('\n\n')
  return `${header}\n\n${body}\n`
}

async function publishOutput(changed) {
  const output = process.env.GITHUB_OUTPUT
  if (!output) return
  await appendFile(output, `changed=${changed}\n`, 'utf8')
}

async function readCurrent() {
  try {
    return await readFile(TARGET_PATH, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return ''
    throw error
  }
}

async function main() {
  const manual = await readFile(MANUAL_PATH, 'utf8')
  const { header, blocks } = parseManual(manual)
  if (blocks.length === 0) {
    throw new Error(`${MANUAL_PATH} has no dated blocks`)
  }
  if (!header.trim()) {
    throw new Error(`${MANUAL_PATH} has no header`)
  }

  const releases = await fetchReleases()
  if (releases.length === 0) {
    throw new Error('The releases API returned an empty list, refusing to regenerate the feed')
  }

  const covered = coveredVersions(blocks)
  const pending = buildPendingEntries(releases, covered)
  const next = render(header, mergeEntries(blocks, pending))
  const current = await readCurrent()

  if (current && current.replace(/\r\n?/g, '\n') === next) {
    console.log(`News feed is already up to date (${covered.size} curated versions)`)
    await publishOutput(false)
    return
  }

  await mkdir(dirname(TARGET_PATH), { recursive: true })
  await writeFile(TARGET_PATH, next, 'utf8')
  await publishOutput(true)

  const entryCount = (next.match(/^### /gm) ?? []).length
  const dateCount = (next.match(/^## /gm) ?? []).length
  console.log(`Updated ${TARGET_PATH}`)
  console.log(`Kept ${covered.size} curated versions, generated ${pending.length} new entries`)
  console.log(`Wrote ${entryCount} entries across ${dateCount} dates`)
  if (pending.length > 0) {
    console.log(`Generated: ${pending.map((release) => release.version).join(', ')}`)
  }
  if (UNKNOWN_HEADINGS.length > 0) {
    console.warn(`Skipped unrecognized headings: ${[...new Set(UNKNOWN_HEADINGS)].join('、')}`)
  }
}

main().catch((error) => {
  console.error(`generate-news failed: ${error.message}`)
  process.exitCode = 1
})
