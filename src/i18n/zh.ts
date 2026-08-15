/* ============================================================
   dsh-plugins · 简体中文文案
   ============================================================ */

export const zh = {
  nav: {
    plugins: '插件',
    features: '特性',
    install: '安装',
    ecosystem: '生态',
    about: '关于',
    github: 'GitHub 组织',
    lang: 'EN',
    langTitle: 'Switch to English',
  },

  hero: {
    status: 'Deep diving...',
    eyebrow: 'open source · for DeepSeek Harness',
    titleA: '接入',
    titleB: '插件，让每种工作走对的模型',
    sub: 'dsh-plugins 是面向 DeepSeek Harness (DSH) 的开源插件组织。我们围绕模型接缝与 Web 界面做小而锐利的插件——辅助模型路由、视觉理解、上下文压缩、动画状态伙伴，即插即用，不碰核心。',
    ctaPlugins: '浏览插件',
    ctaGithub: 'GitHub 组织',
    terminal: {
      tabAux: 'dsh-auxiliary',
      tabBuddy: 'dsh-thought-buddy',
      prompt: 'dsh',
      cmdAux: 'dsh plugin add @dsh-plugin/dsh-auxiliary',
      cmdBuddy: 'dsh plugin add @dsh-plugin/dsh-thought-buddy',
      line1: '✓ plugin installed · routes registered',
      line2: '✓ 2 plugins · zero core changes',
    },
  },

  stats: {
    plugins: '开源插件',
    packages: 'npm 包',
    routes: '类模型路由',
    deps: '运行时依赖（buddy）',
  },

  plugins: {
    eyebrow: 'plugins',
    title: '即插即用，各司其职',
    lead: '每个插件只做一件事，做透它：auxiliary 重新分配模型工作，thought-buddy 让等待也有表情。',
    viewRepo: '查看仓库',
    viewNpm: 'npm',
    version: 'v',
    auxiliary: {
      name: 'dsh-auxiliary',
      tag: 'TypeScript · LGPL-3.0',
      tagline: '辅助模型路由：视觉、压缩、审批、子代理、标题、图像生成，各走各的模型。',
      desc: '在 DSH 的 LLM 接缝（ctx.llm）之上叠加辅助模型能力。每一个特性都是独立、可选的路由，只在属于自己的调用类别里生效——主会话模型永不被动。',
      features: [
        { icon: 'eye', title: '视觉理解', desc: 'inspect_image 工具：读取本地图片，交给视觉模型回答' },
        { icon: 'swap', title: '图像交接', desc: '纯文本主模型也能收发聊天图片，自动转文本引用' },
        { icon: 'stack', title: '上下文压缩', desc: '摘要调用单独走便宜快速的压缩模型' },
        { icon: 'shield', title: '审批路由', desc: '为 approve-for-me 复核提供专用轻量模型' },
        { icon: 'fork', title: '子代理路由', desc: '委派的子代理统一路由，控制委派成本' },
        { icon: 'hash', title: '会话标题', desc: '标题生成调用路由到快速模型' },
        { icon: 'image', title: '图像生成', desc: 'generate_image 直连 OpenAI 兼容 images API' },
        { icon: 'sparkle', title: '模型能力标记', desc: '在模型目录标注「允许图像输入 / 图像生成」' },
      ],
    },
    buddy: {
      name: 'dsh-thought-buddy',
      tag: 'JavaScript · BSD-3-Clause',
      tagline: 'GrokBot 风格动画头像 + 打字机状态栏，就在「Deep diving...」面前。',
      desc: '纯客户端插件：模型工作时，「Deep diving...」状态徽标前长出一只 Grok 风格小机器人——眨眼、表情弹性形变、目光游走、轻轻呼吸。全部由 SVG + requestAnimationFrame 实时绘制，零运行时依赖。',
      features: [
        { icon: 'robot', title: 'GrokBot 头像', desc: '25 种表情 × 双眼 × 48 点眼环，spring 形变' },
        { icon: 'type', title: '表情同步打字机', desc: '每次换表情，状态文字逐字删除再重新打出' },
        { icon: 'emoji', title: 'Emoji 模式', desc: '回退为 emoji 轮播：🤿 🫧 🌊 🐙 🔍 🧠 💭' },
        { icon: 'theme', title: '主题感知', desc: '跟随 prefers-color-scheme，明暗两套配色' },
        { icon: 'motion', title: '减少动态', desc: '尊重 prefers-reduced-motion，弱化呼吸与摇摆' },
      ],
    },
  },

  features: {
    eyebrow: 'auxiliary deep-dive',
    title: '把每种工作，交给对的模型',
    lead: 'auxiliary 的全部能力都建立在同一套模式上：按官方调用标记识别请求，在 llm/stream 瀑布里静默换路。以下路由互不干扰，且只在启用并配置完整时生效。',
    how: '工作原理',
    howText: '每个路由都是常驻的纯透传监听器——只有命中自己的调用类别（purpose: compaction / session-title、审批契约）才替换 provider/model 重新进入接缝，其余请求原样放行。主会话路线从不被触碰，核心包零修改。',
  },

  install: {
    eyebrow: 'install',
    title: '两行命令，交给 agent 安装',
    lead: '把下面的命令块复制并粘贴给你的 DSH agent（Web GUI 里的助手），它会替你完成安装与验证——无需手动改 npm 或 profile。',
    steps: [
      { title: '复制命令', desc: '选择插件，点复制按钮，粘贴给 DSH agent。' },
      { title: 'Agent 安装', desc: 'agent 执行 dsh plugin add，处理构建产物与 bundle 补丁。' },
      { title: '配置使用', desc: 'auxiliary 打开 Settings → Auxiliary Models；buddy 重启 dsh web 后刷新页面。' },
    ],
    copy: '复制',
    copied: '已复制 ✓',
    note: '提示：auxiliary 需要先在 Settings → Models 配置好 provider/model，再在 Auxiliary Models 里选择路由；thought-buddy 所有选项都在 localStorage 里，无需设置页。',
  },

  ecosystem: {
    eyebrow: 'ecosystem',
    title: '在 DSH 生态里生长',
    lead: 'dsh-plugins 是 DeepSeek Harness 插件生态的一部分。从官方文档到社区精选，从这里出发。',
    cards: [
      {
        title: 'DeepSeek Harness',
        desc: '官方文档与插件开发指南：了解 ctx.llm 接缝、llm/stream 瀑布与 settings 插槽。',
        link: '官方文档',
        href: 'https://deepseek-harness.github.io/deepseek-harness/',
      },
      {
        title: 'awesome-dsh-plugin',
        desc: '社区维护的 DeepSeek Harness 插件精选列表，收录 dsh-auxiliary 与 dsh-thought-buddy。',
        link: '精选列表',
        href: 'https://github.com/awesome-dsh-plugin/awesome-dsh-plugin',
      },
      {
        title: 'npm · @dsh-plugin',
        desc: '两个插件均已发布到 npm 组织作用域，支持 GitHub source 与本地 file/link 安装。',
        link: '查看包',
        href: 'https://www.npmjs.com/org/dsh-plugin',
      },
    ],
  },

  about: {
    eyebrow: 'about',
    title: '小而锐利的开源组织',
    lead: '我们相信：好插件应该即插即用、不碰核心、文档双语、许可开放。',
    points: [
      { icon: 'plug', title: '即插即用', desc: '安装即生效：auxiliary 保存即热重配，buddy 刷新即出现。' },
      { icon: 'core', title: '不碰核心', desc: '全部基于 DSH 官方扩展点（接缝、瀑布、插槽），核心包零修改。' },
      { icon: 'docs', title: '双语文档', desc: '每个仓库都维护 README 与简体中文版，含完整配置与架构说明。' },
      { icon: 'license', title: '开放许可', desc: 'LGPL-3.0 与 BSD-3-Clause，欢迎 fork、改进与二次分发。' },
    ],
    maintainer: '维护者',
  },

  cta: {
    title: '给 DSH 加点插件？',
    sub: '欢迎加入 dsh-plugins 组织，一起为 DeepSeek Harness 生态添砖加瓦——提 issue、提 PR，或直接开一个新仓库。',
    btnGithub: '访问 GitHub 组织',
    btnIssue: '提交 Issue',
  },

  footer: {
    tagline: 'Plug into DeepSeek Harness.',
    colNav: '站点',
    colLinks: '链接',
    colLegal: '许可',
    github: 'GitHub 组织',
    docs: 'DSH 官方文档',
    awesome: '社区精选',
    npm: 'npm 包',
    licenseAux: 'dsh-auxiliary · LGPL-3.0',
    licenseBuddy: 'dsh-thought-buddy · BSD-3-Clause',
    builtWith: 'Built with Vue 3 · Vite · TypeScript',
    rights: '© 2026 dsh-plugins organization. All rights reserved.',
  },
}

export type Dict = typeof zh
