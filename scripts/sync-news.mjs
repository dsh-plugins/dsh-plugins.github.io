#!/usr/bin/env node
/**
 * Mirror the DSH news gist into public/api/news.md.
 *
 * The gist is the hand-edited source of truth; this script only downloads it,
 * checks it still looks like the news feed, and normalizes the bytes (UTF-8,
 * LF, single trailing newline). The file is rewritten only when the content
 * actually changed, and the fact is reported through the `changed` step output
 * so the hourly workflow can skip the commit and Pages deploy on a no-op run.
 */
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE_URL =
  'https://gist.githubusercontent.com/Gu-ZT/f08daa33afb82f4b375e604039b92742/raw/DSH_NEWS.md'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TARGET_PATH = resolve(REPO_ROOT, 'public/api/news.md')

/** Guards against an error page or a runaway response replacing the feed. */
const MAX_BYTES = 2 * 1024 * 1024

async function download() {
  let response
  try {
    response = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(30_000) })
  } catch (error) {
    throw new Error(`Failed to reach ${SOURCE_URL}: ${error.message}`)
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch ${SOURCE_URL}: HTTP ${response.status}`)
  }
  return new Uint8Array(await response.arrayBuffer())
}

/** Decodes UTF-8 strictly and normalizes line endings and the trailing newline. */
function normalize(bytes) {
  if (bytes.byteLength === 0) throw new Error('Downloaded news feed is empty')
  if (bytes.byteLength > MAX_BYTES) {
    throw new Error(`Downloaded news feed is ${bytes.byteLength} bytes, above the ${MAX_BYTES} limit`)
  }

  let text
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
  } catch {
    throw new Error('Downloaded news feed is not valid UTF-8')
  }

  const body = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trimEnd()
  if (!body) throw new Error('Downloaded news feed is blank after normalization')
  if (!/^# \S/m.test(body)) throw new Error('Downloaded news feed has no level-1 heading')
  if (!/^## \S/m.test(body)) throw new Error('Downloaded news feed has no dated entries')

  return `${body}\n`
}

async function readCurrent() {
  try {
    return await readFile(TARGET_PATH, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return ''
    throw error
  }
}

/**
 * Line endings are compared after normalization because a Windows checkout
 * with core.autocrlf=true hands the file back as CRLF; treating that as a
 * change would commit the same content every hour.
 */
function sameContent(current, next) {
  return current.replace(/\r\n?/g, '\n').trimEnd() === next.trimEnd()
}

/** Publishes `changed=true|false` for the workflow's `if:` conditions. */
async function publishOutput(changed) {
  const output = process.env.GITHUB_OUTPUT
  if (!output) return
  await appendFile(output, `changed=${changed}\n`, 'utf8')
}

async function main() {
  const next = normalize(await download())
  const current = await readCurrent()

  if (current && sameContent(current, next)) {
    console.log('News feed is already up to date')
    await publishOutput(false)
    return
  }

  await mkdir(dirname(TARGET_PATH), { recursive: true })
  await writeFile(TARGET_PATH, next, 'utf8')
  await publishOutput(true)

  const newestEntry = next.match(/^## \S.*$/m)?.[0] ?? '(none)'
  console.log(`Updated ${TARGET_PATH}`)
  console.log(`Previous size: ${current.length} chars, new size: ${next.length} chars`)
  console.log(`Newest entry: ${newestEntry}`)
}

main().catch(async (error) => {
  console.error(`sync-news failed: ${error.message}`)
  process.exitCode = 1
})
