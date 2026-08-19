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
    join: '加入我们',
    github: 'GitHub 组织',
    lang: 'EN',
    langTitle: 'Switch to English',
  },

  hero: {
    status: 'Deep diving...',
    eyebrow: 'open source · for DeepSeek Harness',
    titleA: '接入',
    titleB: '插件，接住 DSH 的每一次升级',
    sub: 'dsh-plugins 是面向 DeepSeek Harness (DSH) 的开源插件组织。我们以 dsh-loader 的稳定 API 为地基，围绕模型接缝与 Web 界面做小而锐利的插件——辅助模型路由、命令自动审核、代码审查、动画状态伙伴……即插即用，dsh 再升级也不怕。',
    ctaPlugins: '浏览插件',
    ctaGithub: 'GitHub 组织',
    terminal: {
      tabAux: 'dsh-auxiliary',
      tabBuddy: 'dsh-thought-buddy',
      prompt: 'dsh',
      cmdAux: 'dsh plugin add @dsh-plugin/dsh-auxiliary',
      cmdBuddy: 'dsh plugin add @dsh-plugin/dsh-thought-buddy',
      line1: '✓ plugin installed · routes registered',
      line2: '✓ 7 个开源插件 · 核心零修改',
    },
  },

  stats: {
    plugins: '开源仓库',
    packages: 'npm 包',
    routes: '类模型路由',
    deps: '运行时依赖（buddy）',
  },

  plugins: {
    eyebrow: 'plugins',
    title: '即插即用，各司其职',
    lead: '围绕模型接缝与 Web 界面的一整套小而锐利的插件：模型路由、运行审核、代码审查、侧边栏、兼容层……每只插件只做一件事，做透它。',
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
      tag: 'TypeScript · BSD-3-Clause',
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
    loader: {
      name: 'dsh-loader',
      tag: 'TypeScript · LGPL-3.0',
      tagline: '版本感知的运行时兼容层：dsh 升级，插件照常工作。',
      desc: '面向 dsh（DeepSeek Harness）cordis bundle 插件的运行时兼容垫片。通过版本感知的适配器注册表，把第三方插件与 dsh 内部服务名、模块路径、包名与 RPC 细节解耦——dsh 升级破坏内部 API 时，只需升级 dshloader，插件无需改动。',
      features: [
        { icon: 'route', title: '稳定 API', desc: '宿主侧 ctx.dshLoader，浏览器侧 window.__dshLoader__，包导入走稳定子路径' },
        { icon: 'shield', title: '服务逃生口', desc: 'ctx.dshLoader.services.get() 按需读取真实 cordis 服务' },
        { icon: 'file', title: '零 @deepseek-ai/* 依赖', desc: '所有 dsh 包都经由 loader 的稳定子路径访问' },
        { icon: 'hash', title: '版本感知', desc: '按版本适配，吸收内部改名（如 httpServer → webServer）' },
        { icon: 'zap', title: '升级不破', desc: 'dsh 升级只需升级 dshloader，第三方插件保持原样' },
      ],
    },
    approve: {
      name: 'dsh-approve-for-me',
      tag: 'JavaScript · MIT',
      tagline: 'Codex 风格命令自动审核 + 沙箱「替我同意」，含 Web GUI 实时审查状态栏。',
      desc: '一体包（host + 浏览器 UI）：注册审批 answerer，按模式自动审核运行命令——规则 auto / 全自动 full-auto / 拒绝 never，lightweight review 模型审核权限升级，并新增 approve-for-me 与 strict-review 两个 GUI 权限预设。',
      features: [
        { icon: 'shield', title: '自动审核', desc: '规则匹配 auto、全自动 full-auto、拒绝 never 三种模式' },
        { icon: 'eye', title: '轻量模型复核', desc: 'review 模式：由轻量模型裁决权限升级或每次工具调用（移植自 codex guardian）' },
        { icon: 'alert', title: '失败安全', desc: '超时 / 调用失败 / 无法解析 → 默认拒绝（fail-closed）' },
        { icon: 'check', title: '权限预设', desc: 'approve-for-me / strict-review 两个 GUI 可选预设' },
        { icon: 'zap', title: '电路熔断', desc: '连续拒绝过多时交回人工，避免阻塞整轮会话' },
      ],
    },
    review: {
      name: 'dsh-code-review',
      tag: 'JavaScript · GPL-3.0',
      tagline: '逐轮代码变更审查：Codex 风格变更摘要、可缩放 diff 侧边栏、守卫式撤销。',
      desc: '社区 Web 插件，为完成的回合加「变更」工具：变更摘要、可拖拽缩放的 diff 侧边栏、工作区相对文件树、语法高亮与受保护的撤销，让共享工作区安全迭代。',
      features: [
        { icon: 'git', title: '回合级审查', desc: '查看增删行数、从会话打开回合、不离开聊天切换文件' },
        { icon: 'file', title: 'diff 与文件树同屏', desc: '左统一 diff、右可搜索文件树，分隔线可拖拽并持久化' },
        { icon: 'edit', title: '语法感知高亮', desc: 'Shiki 分词，多行注释与字符串保持语法状态' },
        { icon: 'undo', title: '守卫式撤销', desc: '快照 + 版本守卫 + 前后内容链，拒绝歧义 / 过期 / 进行中的改动' },
        { icon: 'layout', title: '大而实用', desc: '突破 520px 上限，窄窗口自动折叠导航' },
      ],
    },
    sidebar: {
      name: 'dsh-better-sidebar-loader',
      tag: 'TypeScript · MIT',
      tagline: 'VSCode 风格右侧边栏（explorer/editor/terminal/git/browser），宿主侧只走 ctx.dshLoader。',
      desc: '把 dsh-better-sidebar 转录到 dshloader 稳定 API：宿主半部 zero 直接 dsh 服务访问、zero @deepseek-ai/* 运行时导入；客户端半部原样复用官方客户端，经 dsh.client.inject 挂载。',
      features: [
        { icon: 'layout', title: 'VSCode 式边栏', desc: 'explorer / editor / terminal / git / browser' },
        { icon: 'route', title: '仅走 dshLoader', desc: '宿主只注入 dshLoader，经稳定 API 访问服务' },
        { icon: 'shield', title: '零运行时导入', desc: '无 @deepseek-ai/* 运行时依赖，包依赖仅 dsh-loader' },
        { icon: 'box', title: '客户端复用', desc: '官方客户端包经 dsh.client.inject 原样复用' },
        { icon: 'zap', title: '面向升级', desc: '内部服务改名不影响插件（适配器注册表）' },
      ],
    },
    stable: {
      name: 'dsh-stable-web-prompt',
      tag: 'JavaScript · MIT',
      tagline: '规整 dsh-web-app 系统提示里依赖端口的本地 URL 并移到末尾，改端口不改变 prompt-cache 前缀。',
      desc: '把系统提示中依赖端口的本地 URL 规整并移到提示区末尾，使修改 Web 端口不再改变提示缓存前缀，从而稳定 prompt-cache。',
      features: [
        { icon: 'hash', title: '稳定缓存前缀', desc: '端口变更不再改变 prompt-cache 前缀' },
        { icon: 'swap', title: '规整本地 URL', desc: '规整系统提示中依赖端口的本地 URL' },
        { icon: 'zap', title: '移向提示末尾', desc: '把该 URL 移动到系统提示末尾，隔离其对缓存的影响' },
      ],
    },
  },

  features: {
    eyebrow: 'dsh-loader deep-dive',
    title: '一份稳定 API，接住 DSH 的每一次升级',
    lead: 'dsh-loader 是整个组织的地基：一份版本感知的适配器注册表，把插件与 dsh 内部服务名、模块路径、包名与 RPC 细节解耦。插件只对稳定 API 编程，dsh 内部怎么变都不影响它们。',
    how: '工作原理',
    howText: '插件宿主侧只访问 ctx.dshLoader，浏览器侧只碰 window.__dshLoader__ 与稳定子路径；每个调用都经版本感知的适配器注册表映射到 dsh 当前的真实服务。dsh 升级破坏内部 API 时，你只需升级 dshloader，插件原样工作——核心零修改。',
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
        desc: '插件均已发布到 npm 组织作用域，支持 GitHub source 与本地 file/link 安装。',
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
      { icon: 'shield', title: '不碰核心', desc: '全部基于 DSH 官方扩展点（接缝、瀑布、插槽），核心包零修改。' },
      { icon: 'book', title: '双语文档', desc: '每个仓库都维护 README 与简体中文版，含完整配置与架构说明。' },
      { icon: 'check', title: '开放许可', desc: 'LGPL-3.0 / BSD-3-Clause / MIT / GPL-3.0，欢迎 fork、改进与二次分发。' },
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
    disclaimer: '非 DeepSeek 官方产品。未获 DeepSeek 许可，亦与 DeepSeek 无任何关联。',
    rights: '© 2026 dsh-plugins organization. All rights reserved.',
  },
}

export type Dict = typeof zh
