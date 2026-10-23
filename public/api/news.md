# DeepSeek Harness 新闻

> [!warning]
> 该新闻页面由人工整理与每小时自动同步共同维护，如有更新不及时，请见谅

> 相关问题可以加群讨论[【古镇天の粉丝小窝】（906233087）](https://qm.qq.com/q/3zKf03S2Bi)
> 
> — 古镇天Gugle

## 2026/10/23

### DeepSeek Harness 0.2.1-rc.3 发布

#### 体验优化

- 新增左侧栏、会话视图和右侧栏的「更多」菜单，方便浏览和创建插件 @Yifffan, @imccyu
- 修复切换会话后，点击「新会话」找不回未发送草稿的问题 @imccyu

#### 其他变更

- DeepSeek API Key 适配器的模型列表更新方式与账号登录模式保持一致 @LegGasai

## 2026/10/17

### DeepSeek Harness 0.2.1-rc.2 发布 >!适配 V4.1-Flash-1017，新增网页搜索与抓取能力!<

#### 新增功能

- 适配 DeepSeek-V4.1-Flash-1017 上线 @LegGasai
- 适配 DeepSeek Search 与 Fetch API，可在网页搜索设置中开启 @yudshj, @LegGasai

### DeepSeek Harness 0.2.1-rc.1 发布 >!0.2.1 系列首个候选版本，汇总 v0.2.0-rc.2 以来全部变更!<

作为 0.2.1 系列的首个候选版本，本版本汇总了自 v0.2.0-rc.2 以来的主要用户和开发者相关变更。

#### 新增功能

- 允许用户从「自定义插件索引源」中发现和安装插件 @turtle1999
- 插件管理页新增「让 Agent 创建插件」入口，可保留草稿进入创造模式；发送需求后才开始执行 @ZiyaZhang
- 支持插件启用、停用、卸载及更新后的依赖同步；启用热重载时，更新或重新安装的可替换插件直接生效，无法热重载时提示重启 @imccyu, @turtle1999
- 可选插件支持极简模式，Official 插件列表支持按需安装与当前发布版对应的 Claude Code 和 Codex 组合包，并可用于 headless、SDK 和 ACP profile @tianyicui, @turtle2099
- 新增实验性插件的 Session 状态记录接口，供插件写入和读取自己的会话记录 @tianyicui
- 新增实验性 Claude Code Mods 兼容层。目前阶段的主要目的是验证 Claude Code Mods API 功能大致为 DeepSeek Harness 插件的一个子集，而非为用户提供实际的完整兼容性 @tianyicui
- 新增实验性开发者工具组合包，提供会话原始日志、聊天分组与正文的双向定位，以及内嵌 NodeJS 调试工具；内嵌 DevTools 目前使用英文界面 @imccyu, @turtle2099
- 新增实验性思考过程机器翻译插件，可在插件页启用，选择 Bing、Google 或付费 DeepSeek Flash @tianyicui, @ZiyaZhang, @imccyu
- 新增实验性 Git Worktrees 插件，可在插件页启用，由 Agent 创建并进入独立的 Git checkout @tianyicui, @turtle2099
- 自定义模型 API 支持通过UI中配置各模型的推理等级，无需手动修改配置文件 @LegGasai
- pi-ai 路由支持按模型能力处理会话中的系统提示词更新，以及工具的动态新增和移除 @Tuyixiang
- 极简模式支持读取图片和自动压缩长对话，Web 与桌面端可通过 /compact 指令手动压缩上下文 @LogosVeritas
- 全局指令支持读取共享 agents 目录中的 AGENTS.md，可通过 DSH_AGENTS_HOME 指定目录 @tianyicui
- 新增 working_directory 工具，并为 TypeScript/Python SDK 提供会话工作目录的读取和切换接口 @tianyicui
- SSH 新增独立可执行的 helper 运行时，支持远端文件操作、进程、终端、沙箱和 Node PTC @LegGasai
- Web 版支持在本机 HTTP 访问时登录 DeepSeek 账号 @lsdsjy
- 支持识别已发送消息中的密钥和令牌，并默认脱敏按需查看 @ZiyaZhang
- 新会话支持预填未发送的提示；恢复草稿或切换工作区时保留文件、目录和会话引用 @imccyu
- 新增工作步骤收起时机设置，可选择回答结束后收起，或在下一条普通消息到来时收起 @imccyu
- Markdown 文件预览将 YAML 头部元数据显示为清晰的字段列表 @turtle2099

#### 体验优化

- 改善自动化任务详情在窄窗口中的布局，关联会话入口会按可用空间收起为图标 @turtle2099
- 子智能体可通过配置选用独立 Agent Preset 预设，统一设置角色和工具 @grllll, @Dudu-0223
- 改进子智能体的委派与等待指引：达到委派层数上限时提前提示，等待子任务期间不再消耗新的目标执行轮次 @ZiyaZhang, @turtle1999
- 组合包详情页显示代码来源和当前版本，便于查看安装来源及重装所需的信息 @turtle1999
- 插件安装结果显示实际安装版本；因新版本冷却策略安装较旧版本时，提供说明和精确版本安装方式 @turtle2099
- 工具调用在准备阶段即可显示已到达的命令说明、文件路径和内容生成进度 @imccyu
- Shell 和插件安装详情支持横向查看及复制完整命令；后台 Bash 调用可展开输入和启动回执 @tianyicui
- Web 终端更可靠地处理连续输入、粘贴和尺寸调整，并保留进程退出前的最后输出 @LegGasai
- PTC Mode 的 Node 执行环境新增可选的 in-memory 模式，多次运行代码可复用变量、函数和已导入模块 @CreatixChu
- 改善大量会话的列表加载与 @ 会话搜索体验 @turtle1999, @imccyu
- 优化自动会话标题生成，对同主题的追问、补充和继续请求保留已有合适标题 @tianyicui, @ZiyaZhang
- 侧栏 Fork 和子代理目录浏览新增迁移提示，遇到需要迁移的会话时引导用户先打开原会话 @imccyu
- 优化侧栏展开规则，让运行中和等待回应的会话更容易找到；会话菜单支持复制会话 ID @turtle1999, @imccyu
- 支持分别设置界面正文、代码与工具输出、侧栏终端的字体和字号；桌面端可通过 Cmd/Ctrl + 加号或减号统一调整字号 @turtle2099, @koalazf99
- 优化会话和工作区的悬停操作，统一卡片与菜单样式，并改善页头排列及插件页、自动化任务页的窄窗口布局 @Yifffan, @Kingwl
- 语音输入新增麦克风选择，可在插件详情页选择输入设备，并查看所选设备的实时输入电平 @yudshj
- 允许远程主机访问的 Web 配置使用页面内目录选择器，不再在服务器上弹出原生目录对话框 @oraluben
- 优化含超长源码行的文件预览性能，超长行使用无高亮文本展示，普通行继续进行语法高亮 @turtle2099
- Office 文档任务按需加载编辑、渲染和导出指引，减少简单修改及 PDF 导出后的无关检查与预览，并避免在回复中引用已删除的预览图 @yudshj
- DeepSeek 账号的模型列表随账号可用模型更新，并隐藏当前客户端版本不支持的模型 @LegGasai
- 模型设置更清楚地提示凭据来源和检测状态，支持按需显示输入的 API Key @Magolor

#### 问题修复

- 目标编辑支持多行文本和 Shift+Enter 换行，并改善目标与排队消息编辑器的中文输入及宽度适配 @turtle2099
- 修复目标任务停止、恢复并再次停止后，新消息滞留队列的问题 @turtle2099
- 修复 Trajectory 将等待、流式输出或重试中的请求标为完成，以及压缩任务提前显示结果的问题 @turtle2099, @kermanx
- 修复后台工作流仍在运行，却因父级工具步骤或对话轮次正常结束而被标为已中断的问题 @turtle2099
- 恢复可继续子代理输入栏的图片粘贴和拖放，支持运行中追加图片和完成后发送图片续发消息 @ZiyaZhang
- 应用意外退出后，未完成的任务会明确显示「任务已停止」，避免被误认为正常完成 @turtle2099
- 修复部分 Bash、PowerShell 和文件修改记录无法展开输出或差异的问题 @turtle2099
- 修复凭据、配置和技能文件监听器关闭后的未捕获异常，以及 Agent 关闭时资源提前释放的问题 @tianyicui, @kermanx
- 修复部分 Windows 环境下，持久 PowerShell 在大量输出滚屏后迟迟无法结束当前调用的问题 @Chinesezjc
- 修复 Windows Desktop 终端退出后，PTY 后台工作进程未随之清理的问题 @winewill
- 减少 Linux 下启动命令前的重复检查，降低命令启动开销，并改善较旧 systemd 环境的兼容性 @imccyu
- 修复命令执行失败时，未呈现有效的状态信息 @yudshj
- 减少新建与恢复多个终端时的重复查询，并避免失效终端在切换面板后反复重试 @LegGasai
- 改善 PTC Mode 中缺失的部分指引，并统一 SDK、Web 和 headless 的模型身份说明 @koalazf99
- 关闭代码工作视图后仍可选择标准、创造和自定义模式；内置 PTC／极简默认值改为标准，已有会话保持原模式 @ZiyaZhang
- 修复启停插件时其他插件的样式被移除、需要刷新页面才能恢复的问题 @turtle2099
- 启用开发目录监听后，HMR 可刷新包入口和依赖映射配置，并正确重载仍在运行的原入口 @imccyu
- 修复在插件页启用或停用插件后，已打开会话的 / 菜单未更新技能列表的问题 @grllll
- 登录请求未收到响应时显示网络检查提示，便于区分连接问题与其他登录失败 @lsdsjy
- 修复模型响应流停止输出、且底层传输不响应取消时，请求超过空闲超时仍一直挂起的问题 @tianyicui
- 修复插件包元信息不可读，或辅助请求扩展准备失败时，整个 DeepSeek 请求被阻断的问题 @turtle1999, @turtle2099
- 修复模型设置刷新期间仍可基于旧数据编辑或删除配置，导致刚保存的选择未出现在编辑器中的问题 @tianyicui
- 凭据文件中出现 DSH 不使用的额外字段时，不再阻止应用启动 @turtle2099
- 桌面端默认使用系统分配的端口，避免 Windows 保留端口范围导致应用无法启动 @turtle2099
- 修复展开右侧栏后，会话标题栏中的后台任务列表被侧栏遮挡或裁切的问题 @turtle2099
- 修复 Windows Desktop 图片预览遮罩及关闭按钮与标题栏重叠、侧栏按钮悬停圆角不一致的问题 @turtle2099
- 修复 Windows 安装器对磁盘根目录的校验，拒绝带重复末尾路径分隔符的根目录写法 @tianyicui
- 修复 macOS 应用的小尺寸 Finder 图标，以及复制和替换应用提示中的图标损坏问题 @07akioni
- 修复 Windows 和 Linux 下右侧栏收起时，在输入框按 Page Up 导致整个界面向左偏移的问题 @imccyu
- 修复侧栏列表重排或重新显示后，会话加载动画不同步的问题 @turtle2099
- 修复 /goal、/plan 等命令与参数交界处的输入异常及草稿与显示不一致，支持整体选中、删除命令，并在撤销或刷新页面后恢复 @LegGasai
- 修复切换会话、收起工作过程或发送后续消息时，对话区域出现大块空白、滚动跳动的问题 @imccyu
- 修复重启应用后部分会话无法继续，以及切换到 DeepSeek 后因历史消息兼容问题导致请求失败的情况 @imccyu, @yudshj
- 修复 macOS 添加工作区时目录选择器无法粘贴目录路径，以及取消选择仍添加工作区的问题 @turtle2099
- 修复原预设被删除或调整后，恢复空白会话、切换工作区可能失败的问题 @LegGasai
- 修复卸载会话存储插件时，最后的会话记录可能丢失的问题 @turtle1999
- 修复本地 SenseVoice 语音识别开启 VAD 后，录音开头被截断、首字或音节丢失的问题 @yudshj
- 修复远程 Web 在网络拥塞时被误判为断线，以及刷新后语言、主题等偏好丢失的问题 @turtle2099, @oraluben

#### 其他变更

- API Key 读取优先级变更：Web端/桌面端优先采用已保存的凭据；headless 默认改用环境变量和 .env，不读取已保存的密钥 @Magolor
- 移除运行时 invariant 插件及各包的 ./invariant 导出；使用这些诊断入口的开发者需相应调整扩展或自定义 profile @turtle2099
- 子路径插件不再读取独立的 package.json，显示文本和图标须通过对应子路径导出；插件开发模板同步补齐本地化信息与图标 @turtle1999
- 第三方插件的版本兼容性优先按 engines.dsh 判断；未声明时沿用原有规则。插件作者需检查声明是否覆盖支持的 DSH 版本 @turtle1999
- 输入区统计扩展拆为 activity 和 usage 两个独立入口；覆盖旧 stats 整行的插件需要更新注册 ID @turtle1999
- 为用户消息、文本与图片展示、新会话页及模型选择器添加扩展位，支持插件定制对应内容 @imccyu, @LegGasai
- 自动化任务改为 Web 内置能力，提醒工具按模式提供：标准、创造和 PTC 模式可用，极简模式和子代理不可用；旧实验组合包选择会自动清理，已有任务保留 @Chinesezjc, @turtle1999
- 关闭计划审阅以补充修改意见时，直接结束当前轮次并等待用户反馈，避免额外调用模型 @turtle2099
- 统一子代理执行与完成通知，工具立即返回 child ID；自定义 SDK runtime 需支持 session/wait @Dudu-0223
- Agent Team 消息改为直接投递目标 Inbox，移除独立 outbox、自动重试和重发去重；相关配置与结果字段需迁移 @Dudu-0223
- Python PTC 接入 Session 文件沙箱策略；自定义组合需提供 sandbox 和 sandboxPolicy 服务 @tianyicui
- 移除工具展示的 both 混合模式，仅保留 native 和 ptc；使用旧模式的配置与 API 调用需要更新 @tianyicui
- 移除 agent-instructions 插件逐行 dshHome 配置，指令目录改从进程的 DSH_HOME 或默认目录读取 @tianyicui
- 默认 SDK profile 从固定的编程 Agent 改为通用 AI Agent 身份，适用于一般任务 @Dudu-0223
- 使用 --from-default-profile 重建已有自定义配置时，会替换该配置及其插件和设置 @turtle2099
- TypeScript 和 Python SDK 支持 resume 功能，恢复已保存的会话，继续使用原有会话 ID 和工作目录 @koalazf99
- Python SDK 的 Office 引擎和完整创作环境改为按需下载 @yudshj
- 完善网关授权与连接机制，支持按调用方身份控制资源访问，并独立管理 API 连接及其交互参与方式 @imccyu
- Web 支持通过 --public-url 指定显示、打开及提供给模型的对外访问地址，支持带路径前缀的反向代理入口 @oraluben
- Web 支持绑定指定的 IPv4/IPv6 地址，并通过 --tls-cert 和 --tls-key 配置原生 HTTPS 监听 @oraluben
- pi-ai 更新至 1.0.2，包含上游模型目录更新和适配器修复 @tianyicui
- 更新第三方模型支持；Azure 提供方名称统一为 azure，使用旧名称 azure-openai-responses 的提供方配置需迁移 @LegGasai
- 更新运行时工具、MCP 协议、图片处理和客户端渲染依赖，纳入兼容版本的安全修复 @tianyicui

## 2026/10/16

### DeepSeek Harness 0.2.1-alpha.5 发布 >!修复插件页、终端等交互，新增模型名称 Slot!<

#### 问题修复

- 修复在插件页启用或停用插件后，已打开会话的 / 菜单未更新技能列表的问题 @grllll
- 减少新建与恢复多个终端时的重复查询，并避免失效终端在切换面板后反复重试 @LegGasai
- 改善 PTC Mode 中缺失的部分指引，并统一 SDK、Web 和 headless 的模型身份说明 @koalazf99
- 修复 Windows 和 Linux 下右侧栏收起时，在输入框按 Page Up 导致整个界面向左偏移的问题 @imccyu

#### 其他变更

- 新增 conversation.input.model.label Slot，支持插件按模型渠道自定义输入框模型选择器中的名称展示 @LegGasai

## 2026/10/15

### DeepSeek Harness 0.2.1-alpha.4 发布 >!自定义插件索引源与模型推理等级配置!<

#### 新增功能

- 自定义模型 API 支持通过 UI 中配置各模型的推理等级，无需手动修改配置文件 @LegGasai
- 允许用户从「自定义插件索引源」中发现和安装插件 @turtle1999

#### 问题修复

- 修复命令与参数交界处输入异常的问题。支持整体选中/删除，并在撤销或刷新页面后恢复 @LegGasai
- 改进 Office 文件交付：避免在回复中引用已删除的预览图，减少 PDF 导出后不必要的工具查找和额外检查 @yudshj
- 修复启用开发者工具后，仍需刷新页面才能打开工具面板的问题 @imccyu
- 减少 Linux 下启动命令前的重复检查，降低命令启动开销，并改善较旧 systemd 环境的兼容性 @imccyu
- 修复命令执行失败时，未呈现有效的状态信息 @yudshj

#### 其他变更

- 第三方插件的版本兼容性优先按 engines.dsh 判断；未声明时沿用原有规则。插件作者需检查声明是否覆盖支持的 DSH 版本 @turtle1999

## 2026/10/14

### DeepSeek Harness 0.2.1-alpha.3 发布 >!极简模式支持读图与自动压缩，消息里的密钥默认脱敏!<

#### 新增功能

- Web 版支持在本机 HTTP 访问时登录 DeepSeek 账号 @lsdsjy
- 支持识别已发送消息中的密钥和令牌，并默认脱敏按需查看 @ZiyaZhang
- 极简模式支持读取图片和自动压缩长对话，Web 与桌面端可通过 /compact 指令手动压缩上下文 @LogosVeritas

#### 体验优化

- 改善会话列表加载和 @ 会话搜索体验 @imccyu
- 子智能体可通过配置选用独立 Agent Preset 预设，统一设置角色和工具 @grllll, @Dudu-0223
- 优化侧栏展开规则，让运行中和等待回应的会话更容易找到；会话菜单支持复制会话 ID @turtle1999, @imccyu
- DeepSeek 账号的模型列表随账号可用模型更新，并隐藏当前客户端版本不支持的模型 @LegGasai
- 模型设置更清楚地提示凭据来源和检测状态，支持按需显示输入的 API Key @Magolor
- Office 文档任务按需加载编辑、渲染和导出指引，减少简单内容修改中不必要的检查与预览 @yudshj
- 改进子智能体的委派与等待指引：达到委派层数上限时提前提示，等待子任务期间不再消耗新的目标执行轮次 @ZiyaZhang, @turtle1999
- Web 终端更可靠地处理连续输入、粘贴和尺寸调整，并保留进程退出前的最后输出 @LegGasai
- 桌面端可用 Cmd/Ctrl + 加号或减号统一调整正文、代码和终端字号 @koalazf99
- 优化会话和工作区的悬停操作，统一卡片与菜单样式，并改善页头排列及插件页、自动化任务页的窄窗口布局 @Yifffan, @Kingwl
- PTC Mode 的 Node 执行环境新增可选的 in-memory 模式，多次运行代码可复用变量、函数和已导入模块 @CreatixChu

#### 问题修复

- 修复切换会话、收起工作过程或发送后续消息时，对话区域出现大块空白、滚动跳动的问题 @imccyu
- 修复重启应用后部分会话无法继续，以及切换到 DeepSeek 后因历史消息兼容问题导致请求失败的情况 @imccyu, @yudshj
- 修复插件更新或重新安装后仍运行旧代码的问题。启用热重载时，可替换的插件会直接生效；无法热重载的情况会提示重启 @turtle1999
- 修复 macOS 添加工作区时目录选择器无法粘贴目录路径，以及取消选择仍添加工作区的问题 @turtle2099
- 修复原预设被删除或调整后，恢复空白会话、切换工作区可能失败的问题 @LegGasai
- 修复部分较旧 Git 版本下无法创建工作树的问题 @turtle2099
- 修复远程 Web 在网络拥塞时被误判为断线，以及刷新后语言、主题等偏好丢失的问题 @turtle2099, @oraluben
- 应用意外退出后，未完成的任务会明确显示「任务已停止」，避免被误认为正常完成 @turtle2099
- 凭据文件中出现 DSH 不使用的额外字段时，不再阻止应用启动 @turtle2099
- 修复卸载会话存储插件时，最后的会话记录可能丢失的问题 @turtle1999

#### 其他变更

- API Key 读取优先级变更：Web 端/桌面端优先采用已保存的凭据；headless 默认改用环境变量和 .env，不读取已保存的密钥 @Magolor
- 更新第三方模型支持；Azure 提供方名称统一为 azure，使用旧名称 azure-openai-responses 的提供方配置需迁移 @LegGasai
- Python SDK 的 Office 引擎和完整创作环境改为按需下载 @yudshj
- 使用 --from-default-profile 重建已有自定义配置时，会替换该配置及其插件和设置 @turtle2099
- TypeScript 和 Python SDK 支持 resume 功能，恢复已保存的会话，继续使用原有会话 ID 和工作目录 @koalazf99

## 2026/10/09

### DeepSeek Harness 0.2.1-alpha.2 发布 >!翻译与 Git Worktrees 实验插件，外加移除 both 工具展示模式!<

#### 新增功能

- 新增实验性思考过程机器翻译插件，可在插件页启用，选择 Bing、Google 或付费 DeepSeek Flash @tianyicui, @ZiyaZhang, @imccyu
- 新增实验性 Git Worktrees 插件，可在插件页启用，由 Agent 创建并进入独立的 Git checkout @tianyicui
- 新增实验性插件的 Session 状态记录接口，供插件写入和读取自己的会话记录 @tianyicui
- 全局指令支持读取共享 agents 目录中的 AGENTS.md，可通过 DSH_AGENTS_HOME 指定目录 @tianyicui
- 新增 working_directory 工具，并为 TypeScript/Python SDK 提供会话工作目录的读取和切换接口 @tianyicui
- Official 插件列表新增 Claude Code 和 Codex 组合包的按需安装入口，发布版安装对应版本的包 @tianyicui
- 新增工作步骤收起时机设置，可选择回答结束后收起，或在下一条普通消息到来时收起 @imccyu
- pi-ai 路由支持按模型能力处理会话中的系统提示词更新，以及工具的动态新增和移除 @Tuyixiang
- SSH 新增独立可执行的 helper 运行时，支持远端文件操作、进程、终端、沙箱和 Node PTC @LegGasai

#### 体验优化

- 通用设置新增字体选项，可分别调整界面正文、代码与工具输出、侧栏终端的字体和字号 @turtle2099
- 语音输入新增麦克风选择，可在插件详情页选择输入设备，并查看所选设备的实时输入电平 @yudshj
- Web 支持绑定指定的 IPv4/IPv6 地址，并通过 --tls-cert 和 --tls-key 配置原生 HTTPS 监听 @oraluben
- Shell 和插件安装详情支持横向查看及复制完整命令；后台 Bash 调用可展开输入和启动回执 @tianyicui
- 优化含超长源码行的文件预览性能，超长行使用无高亮文本展示，普通行继续进行语法高亮 @turtle2099
- 优化自动会话标题生成，对同主题的追问、补充和继续请求保留已有合适标题 @tianyicui, @ZiyaZhang
- 允许远程主机访问的 Web 配置使用页面内目录选择器，不再在服务器上弹出原生目录对话框 @oraluben
- 侧栏 Fork 和子代理目录浏览新增迁移提示，遇到需要迁移的会话时引导用户先打开原会话 @imccyu

#### 问题修复

- 修复模型响应流停止输出、且底层传输不响应取消时，请求超过空闲超时仍一直挂起的问题 @tianyicui
- 修复插件包元信息不可读，或辅助请求扩展准备失败时，整个 DeepSeek 请求被阻断的问题 @turtle1999, @turtle2099
- 修复凭据、配置和技能文件监听器关闭后的未捕获异常，以及 Agent 关闭时资源提前释放的问题 @tianyicui, @kermanx
- 修复模型设置刷新期间仍可基于旧数据编辑或删除配置，导致刚保存的选择未出现在编辑器中的问题 @tianyicui
- 修复部分 Windows 环境下，持久 PowerShell 在大量输出滚屏后迟迟无法结束当前调用的问题 @Chinesezjc
- 修复 Windows 缺少 sleep 命令时，Claude Code Mods 的 Blast Radius 示例在取消后仍执行工具的问题 @tianyicui
- 修复 Trajectory 将等待、流式输出或重试中的请求标为完成，以及压缩任务提前显示结果的问题 @turtle2099, @kermanx
- 修复后台工作流仍在运行，却因父级工具步骤或对话轮次正常结束而被标为已中断的问题 @turtle2099
- 恢复可继续子代理输入栏的图片粘贴和拖放，支持运行中追加图片和完成后发送图片续发消息 @ZiyaZhang
- 修复在 /goal、/plan 等高亮命令与参数交界处输入时，编辑器报错及草稿与屏幕文字不一致的问题 @LegGasai
- 修复展开右侧栏后，会话标题栏中的后台任务列表被侧栏遮挡或裁切的问题 @turtle2099
- 修复 Windows Desktop 图片预览遮罩及关闭按钮与标题栏重叠、侧栏按钮悬停圆角不一致的问题 @turtle2099
- 修复开发者工具捕获网络响应时，调用者取消请求后，响应读取和连接仍未结束的问题 @turtle2099
- 修复本地 SenseVoice 语音识别开启 VAD 后，录音开头被截断、首字或音节丢失的问题 @yudshj
- 修复 Windows 安装器对磁盘根目录的校验，拒绝带重复末尾路径分隔符的根目录写法 @tianyicui
- 修复 macOS 应用的小尺寸 Finder 图标，以及复制和替换应用提示中的图标损坏问题 @07akioni
- 修复 Windows Desktop 终端退出后，PTY 后台工作进程未随之清理的问题 @winewill

#### 其他变更

- Python PTC 接入 Session 文件沙箱策略；自定义组合需提供 sandbox 和 sandboxPolicy 服务 @tianyicui
- 移除工具展示的 both 混合模式，仅保留 native 和 ptc；使用旧模式的配置与 API 调用需要更新 @tianyicui
- 移除 agent-instructions 插件逐行 dshHome 配置，指令目录改从进程的 DSH_HOME 或默认目录读取 @tianyicui
- 统一子代理执行与完成通知，工具立即返回 child ID；自定义 SDK runtime 需支持 session/wait @Dudu-0223
- Agent Team 消息改为直接投递目标 Inbox，移除独立 outbox、自动重试和重发去重；相关配置与结果字段需迁移 @Dudu-0223
- 默认 SDK profile 从固定的编程 Agent 改为通用 AI Agent 身份，适用于一般任务 @Dudu-0223
- 可选插件支持极简模式；Claude Code 和 Codex 组合包可用于 headless、SDK 和 ACP profile @turtle2099
- 更新运行时工具、MCP 协议、图片处理和客户端渲染依赖，纳入兼容版本的安全修复 @tianyicui
- pi-ai 更新至 1.0.2，包含上游模型目录更新和适配器修复 @tianyicui

## 2026/10/03

### DeepSeek Harness 0.2.1-alpha.1 发布 >!实验性 Claude Code Mods 兼容层，外加移除 invariant 的破坏性变更!<

#### 新增功能

- 新增实验性 Claude Code Mods 兼容层。目前阶段的主要目的是验证 Claude Code Mods API 功能大致为 DeepSeek Harness 插件的一个子集，而非为用户提供实际的完整兼容性 @tianyicui
- 插件管理页新增「让 Agent 创建插件」入口，可保留草稿进入创造模式；发送需求后才开始执行 @ZiyaZhang
- 新会话支持预填未发送的提示；恢复草稿或切换工作区时保留文件、目录和会话引用 @imccyu
- Markdown 文件预览将 YAML 头部元数据显示为清晰的字段列表 @turtle2099
- Web 支持通过 --public-url 指定显示、打开及提供给模型的对外访问地址，支持带路径前缀的反向代理入口 @oraluben
- 新增可选的开发者工具组合包，提供会话原始日志、聊天分组与正文的双向定位，以及内嵌 Host 调试工具；内嵌 DevTools 目前使用英文界面 @imccyu

#### 体验优化

- 改善自动化任务详情在窄窗口中的布局，关联会话入口会按可用空间收起为图标 @turtle2099
- 组合包详情页显示代码来源和当前版本，便于查看安装来源及重装所需的信息 @turtle1999
- 工具调用在准备阶段即可显示已到达的命令说明、文件路径和内容生成进度 @imccyu
- 加快大量会话的列表读取，同时继续为其他操作提供执行机会 @turtle1999
- 插件安装结果显示实际安装版本；因新版本冷却策略安装较旧版本时，提供说明和精确版本安装方式 @turtle2099

#### 问题修复

- 目标编辑支持多行文本和 Shift+Enter 换行，并改善目标与排队消息编辑器的中文输入及宽度适配 @turtle2099
- 修复目标任务停止、恢复并再次停止后，新消息滞留队列的问题 @turtle2099
- 修复部分 Bash、PowerShell 和文件修改记录无法展开输出或差异的问题 @turtle2099
- 关闭代码工作视图后仍可选择标准、创造和自定义模式；内置 PTC／极简默认值改为标准，已有会话保持原模式 @ZiyaZhang
- 修复启停插件时其他插件的样式被移除、需要刷新页面才能恢复的问题 @turtle2099
- 登录请求未收到响应时显示网络检查提示，便于区分连接问题与其他登录失败 @lsdsjy
- 桌面端默认使用系统分配的端口，避免 Windows 保留端口范围导致应用无法启动 @turtle2099
- 修复侧栏列表重排或重新显示后，会话加载动画不同步的问题 @turtle2099
- 启用开发目录监听后，HMR 可刷新包入口和依赖映射配置，并正确重载仍在运行的原入口 @imccyu
- 修复新组合包启用后找不到依赖，以及停用或卸载后残留依赖映射的问题；替换已安装包的版本仍需重启 @imccyu

#### 其他变更

- 自动化任务改为 Web 内置能力，提醒工具按模式提供：标准、创造和 PTC 模式可用，极简模式和子代理不可用；旧实验组合包选择会自动清理，已有任务保留 @Chinesezjc, @turtle1999
- 子路径插件不再读取独立的 package.json，显示文本和图标须通过对应子路径导出；插件开发模板同步补齐本地化信息与图标 @turtle1999
- 破坏性变更：移除运行时 invariant 插件及各包的 ./invariant 导出；依赖这些诊断入口的扩展和自定义 profile 需要调整 @turtle2099
- 输入区统计扩展拆为 activity 和 usage 两个独立入口；覆盖旧 stats 整行的插件需要更新注册 ID @turtle1999

## 2026/09/29

### DeepSeek Harness 0.2.0-rc.2 发布 >!桌面端内置 dsh 命令，模型搜索更便捷!<

#### 新增功能

- macOS／Windows 桌面端可在菜单栏中管理和安装 dsh 命令，支持管理插件，无需另装 Node 或 pnpm @tianyicui

#### 体验优化

- 模型选择器在模型较多时提供搜索，支持模糊匹配和键盘选择 @MrCroxx
- 侧栏文件页可直接用本地应用打开当前文件夹，并记住应用选择 @yudshj
- 优化聊天耗时、过程信息、字号和深色主题样式，优化动画运行开销 @yixiangihsiang, @imccyu
- 精简插件安装引导，并区分已安装、不兼容和内置插件的升级提示 @Yifffan, @turtle2099
- 自动化任务投递的提醒改为明确标注的用户定时消息，不再要求 Agent 仅将其作为不可信提醒内容转述 @Chinesezjc
- 加强 Bash 与 PowerShell 的工具提示，提醒 Agent 在删除或移动前核对实际目标路径，以避免路径误判 @turtle2099

#### 问题修复

- 修复新建终端菜单重复列出同名 shell 的问题 @LegGasai
- 修复切换会话或返回对话后计划审阅无法打开、「查看全文」消失的问题 @LegGasai
- 修复设置页关闭「显示代码工作视图」后无法调整 Agent 预设的限制 @lsdsjy
- 修复持久 PowerShell 在完成状态后带有空格时无法正确识别命令结束、丢失退出码或泄露内部标记的问题 @turtle2099
- 修复 macOS Intel 版桌面端内置 Node 的签名权限，避免 Office 技能命令启动时崩溃 @07akioni
- 修复 macOS 和 Linux 从图形入口启动桌面端时缺少登录 shell 环境的问题，使工具路径、代理等用户环境配置可供会话使用 @lsdsjy

#### 其他变更

- Windows 沙箱权限脚本改为经授权后一次完成诊断与修复，保留修改前备份和恢复命令 @Elevator14B
- 更新第三方模型目录与兼容适配至 pi-ai 0.87.1；部分旧模型 ID 被移除，已保存的选择可能需要重新选择 @tianyicui
- 实验性添加异步问答模式，需要手动配置开启：等待超时后 Agent 可继续独立工作，用户仍可稍后回答 @Magolor

## 2026/09/28

### DeepSeek Harness 0.2.0-rc.1 发布 >!0.2.0 系列首个候选版本，汇总 v0.1.7-rc.2 以来全部变更!<

作为 0.2.0 系列的首个候选版本，本版本汇总了自 v0.1.7-rc.2 以来的主要用户和开发者相关变更。

#### 体验优化

- 优化对话进行中和完成状态的实时动画、用时信息、过程信息间距 @yixiangihsiang, @imccyu
- 改善会话在图片失效后自动重传并继续请求的可靠性 @CreatixChu
- 桌面更新提示补全版本、下载和重试说明 @liyao
- 无标题的历史会话统一显示「未命名」，重命名时提供空白输入 @liyao
- 改善插件管理界面、内置插件界面布局及交互，改善安装引导 @ZiyaZhang, @Yifffan
- 改善深色主题下的开关色彩区分度 @Yifffan
- 改善 Office 与 PDF 预览的文字选区在浅色、深色主题下的清晰度 @yudshj
- 改善插件配置保存操作的等待时间 @turtle1999
- 创造模式完善插件开发指引，并提供体验技能 @turtle1999
- 使用 DeepSeek 账号模型的会话无需配置额外 API Key 即可进行网页搜索 @lsdsjy

#### 问题修复

- Windows 内置沙箱新增权限诊断技能，可定位部分访问被拒原因，并在限定目录内进行带备份、可恢复的权限修复 @Elevator14B
- 修复工具调度异常后对话无法继续的问题；已执行但结果未知的操作会提示先核实副作用，不盲目重试 @tianyicui
- 修复桌面端弹窗、菜单和浮动面板避让标题栏，改善小窗口和全屏切换时的内容遮挡及操作问题 @yudshj
- 修复 Windows 中「在文件资源管理器中打开」或定位文件可能打开隐藏窗口、操作无响应的问题 @yudshj
- 修复 macOS 桌面端缺少录音权限、影响麦克风授权的问题 @LegGasai
- 修复 Safari 在回答输出中刷新页面后无法恢复回复的问题 @grllll
- 修复部分 Linux 环境在缺少可选原生预构建包时的 npm 安装失败 @turtle2099

#### 其他变更

- 自动化任务改由可选插件包提供 @Chinesezjc, @ZiyaZhang
- 调整工作过程展示在不同初始化路径的默认值 @imccyu

## 2026/09/24

### DeepSeek Harness 0.1.7-rc.2 发布 >!定时任务、快捷键与桌面端引导来了!<

#### 新增功能

- 启用定时任务后，可创建和管理提醒、查看运行记录；重启后任务仍会保留，并支持最短每分钟重复一次 @Chinesezjc, @ZiyaZhang
- 桌面端新增首次使用引导，介绍可用额度，并帮助选择用途和工作过程的展示方式；中途退出后可继续 @std4453
- Web 和桌面端支持查看、搜索、自定义及恢复快捷键，侧边栏同步显示当前键位 @yxy72, @yixiangihsiang
- 进行中的对话可直接使用新启用的工具，无需另开对话 @Tuyixiang
- 自动审阅拒绝操作后，允许人工审批的会话可由用户决定是否继续；审阅失败会单独提示 @turtle1999
- 关闭桌面窗口后，任务继续在后台运行；退出应用前会提示对任务的影响 @winewill

#### 体验优化

- 归档筛选支持「隐藏已归档／全部对话／仅显示已归档」；仅查看归档时隐藏没有归档对话的工作区 @Yifffan
- 工具卡片、文件预览和代码差异的语法高亮更一致，并支持更多文件类型 @mektpoy
- 文档预览的加载提示更清晰，页面间距和浅色主题背景更易阅读 @yudshj
- 界面圆角、菜单和悬停样式更统一，单文件改动及纯新增或纯删除的差异展示更紧凑 @yixiangihsiang
- 键盘操作时的焦点提示更一致，鼠标操作后不再误显示焦点框 @mektpoy
- 切换模型时显示等待提示，并减少切换后的等待时间 @turtle1999, @LegGasai
- 不兼容插件的跳过提示每次启动只显示一次，避免重复打扰 @turtle1999
- 插件安装时可清楚辨认当前使用的官方源或镜像，重复选项合并显示 @turtle1999
- 审批卡片支持跟随界面语言显示说明，并引导 Agent 使用用户提问的语言解释审批理由 @turtle1999
- 中文插件管理与设置页统一使用「子智能体」名称 @turtle1999
- 折叠的网页抓取卡片可直接点击网址打开网页，无需先展开卡片 @turtle1999

#### 问题修复

- Windows 文件菜单更准确地显示应用图标，并优先使用已关联的应用打开文件 @mektpoy
- 修复部分桌面安装包启动失败的问题 @winewill
- 修复部分插件详情和设置页无法正常显示插件信息的问题，并改善启动失败时的错误提示 @LegGasai
- 减少浏览器将登录密码误填入 API Key 输入框的情况 @LegGasai
- 桌面端聊天中的本地 Markdown 图片可正常预览和放大 @Kaige-Gao
- 通过 GitHub 安装插件失败时，已使用镜像的用户可选择其他安装方式 @ZiyaZhang
- 账号模型可直接在设置页编辑 @lsdsjy
- 桌面端会记住当前账号在内嵌 Platform 页面中已确认的提示，避免反复显示 @lsdsjy
- 额度不足时显示与当前任务匹配的提示，避免 API Key 用户误充到登录账号 @lsdsjy
- Windows 更新提示更清楚地说明自动重启；更新后窗口自动显示到前台，安装时也会更早提醒退出正在运行的应用 @winewill
- 切换界面语言不再改变新建默认工作区的文件夹名称；显示名称仍可本地化，用户改名后保留自定义名称，已有工作区保持原样 @kermanx
- macOS 窗口顶部可稳定拖动，同时保持按钮、表单和弹窗正常操作 @mektpoy
- 改善 Agent 帮助用户启用插件和功能时的操作指引 @turtle1999
- 语音输入未就绪时，点击麦克风即可获得引导并前往语音插件设置 @LegGasai
- 文件侧边栏可正常进入目标位于工作区内的 Windows 目录链接 @mektpoy
- 修复应用异常退出或安装中断后，后续插件安装和配置保存持续失败的问题 @turtle1999
- 修复过长工具输出中的部分字符显示残缺、并可能导致后续对话失败的问题 @mektpoy
- 减少账号余额刷新稍慢时无法显示余额的情况 @lsdsjy
- 修复部分长对话持续无法发送消息的问题 @LegGasai

#### 其他变更

- 插件管理页可启用自动审阅；Inspector 不再默认提供，需要单独安装 @turtle1999
- 账号任务与 API Key 任务使用独立的模型入口；退出账号前会确认并停止运行中的账号任务，登录失效时提示重新登录 @lsdsjy
- 「代码工作工具」统一控制轨迹、代码差异和新任务模式选择；原独立模式选择开关移除，新任务会使用已保存的默认模式 @lsdsjy
- 启用时间上下文后，默认每十分钟向 Agent 更新一次时间；自定义间隔保持有效 @turtle1999
- Web 和桌面端默认关闭定时任务与时间上下文，需要时可手动启用 @turtle1999
- 减少标准模式每轮对话中固定提示信息的 token 开销 @turtle1999

## 2026/09/23

### DeepSeek Harness 0.1.7-rc.1 发布 >!0.1.7 系列首个候选版本，汇总 v0.1.5-rc.3 以来全部变更!<

作为 0.1.7 系列的首个候选版本，本版本汇总了自 v0.1.5-rc.3 以来的主要用户和开发者相关变更。

#### 新增功能

- Web 侧边栏新增终端，支持多标签、Shell 选择和刷新后恢复 @LegGasai
- 管理会话归档：支持置顶、筛选、恢复，并在归档运行中会话时确认受影响的任务 @tianyicui, @Yifffan, @LegGasai
- MCP 支持发现和读取资源、使用 URI 模板。内置 Profile 配置 MCP 服务器后可使用共享资源工具 @tianyicui
- Headless 支持从标准输入接收任务，用 --session-id 继续已有会话，用 --json 逐行输出 JSON 运行事件 @lsdsjy
- 扩展文件、命令及 PTC 工具，支持 DSH 在本地运行，通过 SSH 使用远端工作区 @tianyicui
- 新增实验性 Playwright MCP、Chrome DevTools MCP 和 Stagehand 浏览器后端 @tianyicui
- 新增实验性 Computer Use 支持，可通过 Cua Driver MCP 或原生驱动操作本机、获取截图 @tianyicui
- 新增实验性 Auto review 模式 @pku-xht
- 会话文件改动可在卡片和侧边栏审阅；差异支持逐行、左右分栏、高亮、同步滚动与悬停预览，并改善明暗主题配色 @CreatixChu, @yixiangihsiang, @sjw1231
- 插件管理页支持安装、配置、启停和运行时卸载 @LegGasai, @turtle1999, @imccyu
- 侧边栏可预览 Word、Excel、PowerPoint、CSV 和 TSV；Excel 支持工作表、单元格、公式与复制，并改善窄面板中的控件和触控板滚动 @yudshj, @imccyu
- 支持在侧边栏以浏览器模式访问指定 URL @imccyu
- 支持在侧边栏打开 Subagent 会话 @imccyu
- 侧边栏可预览提交计划；计划审阅在其他面板打开期间到达后仍可查看全文 @LegGasai
- 插件安装可选择官方源、国内镜像或自定义源；首次安装自动选择可访问的源，GitHub 网络失败后可改用镜像重新输入包名 @LegGasai, @Yifffan, @ZiyaZhang
- 实验性语音转写首次使用时准备本地模型；支持自动或手动选择 Hugging Face 与 HF-Mirror 下载源，并在自动模式下尝试其他可用源 @LegGasai
- Agent Team 面板实时展示成员与任务，并可从会话页头查看或切换成员 @Dudu-0223, @Yifffan
- 聊天中的本地图片可直接查看和放大；图片链接在悬停或键盘聚焦时提供预览 @Kaige-Gao

#### 体验优化

- 图片、PDF 和 Office 预览使用统一缩放控件，保留每个标签页的缩放比例；捏合缩放后重新绘制页面以保持文字清晰 @Yifffan, @yudshj
- 为适配 DeepSeek V4.1，调整图片缩放和 Token 估算，提高默认请求图片尺寸和编码质量 @CreatixChu
- MCP 升级至官方 SDK v2，支持协议协商、工具分页，以及未提供工具的服务器 @tianyicui
- 改善文件引用与侧边栏操作，支持直接打开已有文件，并在首次发送消息前使用文件预览和终端 @LegGasai, @Dudu-0223
- 长时间命令和工作流可转入后台；任务面板显示实时输出，后台任务完成后会继续唤醒所属会话 @LegGasai, @turtle1999
- 全新安装首次启动时自动创建默认工作区和空白会话，无需先选择文件夹 @kermanx
- 文件预览在回合结束后自动更新，并支持响应本地文件变化 @grllll
- 文件预览、交付卡片和改动审阅支持使用系统默认或其他关联应用打开文件、显示文件位置，不支持预览的文件也可直接打开 @CreatixChu
- 改善长对话的初始化加载、轮次导航跳转、加载历史开销 @imccyu, @tianyicui
- Team 工具按成员名称操作，并在成员初始任务中提供查找队友和联系 Lead 的指引 @Dudu-0223
- Team 任务看板改为只读，任务创建和更新由 Agent 通过工具完成 @Dudu-0223
- 模型页统一为「添加模型提供商」入口，可在第三方提供商和自定义 API 之间切换并保留草稿 @LegGasai
- 稳定会话与工作过程组的滚动跟随；改善历史分页与轮次跳转，并减少发送消息的瞬间跳动或重复显示 @imccyu
- 统一会话区域各代码块样式，支持复制/换行，并改善差异内容和行号展示 @yixiangihsiang
- 模型发现列表显示原始模型 ID，悬停可见名称，仍可按名称或 ID 搜索 @LegGasai, @yudshj
- 「工作过程展示」设置可在简洁、标准、详细和运行中完全展开模式间切换；连续思考与工具调用归为可折叠过程组 @imccyu
- 工具调用在生成参数时显示准备状态；写入或编辑文件时显示内容准备进度 @imccyu
- 「性能与用量」设置可控制聊天中性能和用量信息的显示详略 @lsdsjy
- 「开发者工具」设置控制诊断入口；插件提供的标签页保持可见 @std4453, @lsdsjy
- Windows 可通过系统关联应用打开配置文件和其他本地文件 @Elevator14B
- Office 任务默认使用随应用安装的 LibreOffice 运行环境 @yudshj

#### 问题修复

- Web 连接提示支持区分自动与手动重连；服务重启后在应用就绪时恢复回复，同时保留会话历史和输入草稿 @Yifffan, @imccyu
- 可选插件启动失败时，其余可用插件仍可运行；必需插件失败时退出 @turtle1999
- 修复旧子代理完成通知在 Messages 协议下导致父会话无法继续的问题 @tianyicui, @LegGasai
- 启动失败时分类显示错误和等待中的服务，并将完整诊断保存到日志文件 @turtle1999
- 修复 pi-ai 视觉模型被识别为仅支持文本的问题，支持手动调整输入类型 @Kingwl, @LegGasai
- 修复重启后待处理的 Inbox 消息无法恢复的问题 @kermanx
- 修复重复申请当前有效权限模式时仍需审批的问题 @turtle1999
- 会话被其他 DSH 实例占用时，提示退出对应实例后重试 @07akioni
- Web 用户终端使用系统用户权限，不受 Agent 沙箱模式限制 @LegGasai
- 修复 Web 部署在反向代理的子路径下无法正常访问的问题 @oraluben
- 新建空白会话不再误复用已有历史或被其他实例占用；列表刷新和重连后保留会话状态，并显示创建失败原因 @LegGasai, @turtle1999, @liukx0205
- 无法读取的可选插件包不再直接中止 Profile 加载，并在插件管理页保留错误信息和禁用、移除操作 @turtle1999
- 插件安装弹窗可在等待期间立即关闭，并可重新查看同一安装任务；连接异常后会尝试恢复结果，无法确认时明确提示 @LegGasai
- 修复侧边栏 Markdown 预览中的本地图片加载，支持相对文档路径、中文、空格及 URL 编码 @LegGasai
- 主动压缩会预留模型输出预算和额外上下文空间，减少长输出后才触发压缩而导致的上下文溢出 @Dudu-0223
- 修复源码启动时受模块运行时解析行为影响导致的初始化失败，并支持 link 到本地开发中的插件 @imccyu
- 修复 Windows 沙箱可删除授权目录之外文件的问题，并阻止跨工作区删除 @Elevator14B
- 修复 pi-ai 处理大型流式工具参数时阻塞整个 DSH 进程的问题 @turtle1999
- 修复 Pkg 运行时并发首次加载 Native addon 时崩溃或加载失败的问题 @koalazf99
- 修复语音输入切换识别语言或识别器时设置保存失败的问题，选择立即生效并在重启后保留 @LegGasai
- 修复 Safari/WebKit 中模型菜单的鼠标选择和触发按钮收起问题，并恢复键盘焦点 @grllll
- 模型设置页固定将 DeepSeek 官方提供商显示在首位，同时保留其他提供商顺序 @LegGasai
- Web 服务恢复后正确重新注册模块路由 @turtle1999
- 插件安装或卸载停滞时会结束等待，避免长期占用 Profile 配置 @turtle1999
- 长时间使用双向流时，Gateway 不再持续保留已消费的数据 @imccyu

#### 其他变更

- 官方 DeepSeek 适配器仅使用 Messages API，并可通过 Files API 复用已上传图片；旧 protocol 配置和 Chat Completions 地址需迁移 @LegGasai, @tianyicui
- 默认不再启用 Ralph，需要使用时请手动启用 @tianyicui
- 移除内置 E2B 执行后端，相关自定义配置需调整 @tianyicui
- PTC 包名和服务名统一为 ptc-runtime 系列，旧名称不再兼容，自定义插件和配置需更新 @tianyicui
- 工作流执行器改为 workflow-ptc，遵循会话文件策略；自定义配置需更新名称，暂不支持 Python PTC @tianyicui
- agent/session-start 改为异步串行的 agent/created，首次模型请求等待初始化完成，相关插件及注册调用需适配 @kermanx
- 弃用 Session 的同步历史读取接口 snapshotEvents、eventAt 和 ownEvents @kermanx
- 实验性 Team 模式统一使用 spawn_teammate，关闭 subagent 和 subagent_fork，默认队友创建上限从 8 增至 16 @Dudu-0223
- Node PTC 改用独立进程执行，遵循会话文件策略并限制输出和堆内存；process.env 为空，依赖旧执行环境的代码需适配 @tianyicui
- 配置热更新取消事务回滚：解析失败保留原配置，插件激活失败可能部分生效，需修正配置后恢复 @turtle1999
- SandboxProvider.confine 和 ShellExecutor.start 改为可取消的异步接口，准备时间计入超时；修复 POSIX 符号链接与父目录组合、Windows 驱动器相对路径解析 @tianyicui
- 默认模型列表移除 V4 Flash 和 V4 Flash Vision Exp @tianyicui
- 可继续对话的 Subagent 链默认最多同时保留 8 个子代理、委派深度为 1，可在设置中调整 @Dudu-0223, @ZiyaZhang
- 创造模式移除原 Cordis 动态定义及运行工具，调整为通过 Plugin Manager 安装持久化插件 @turtle1999
- 客户端 Session 会话支持多实例共存，相关 API 及 slot 有变化 @imccyu
- Session 日志升级为 V4，新增面向开发者的批量迁移工具，并兼容部分 V3 会话缺少轮次结束记录的情况 @tianyicui, @kermanx
- 仅保存在自定义事件中的附件不再自动读取或导出，插件需适配 @tianyicui
- 插件可通过 locale 数据结构声明多语言标题和描述，通过 package.json 声明图标，并用于插件管理页面展示 @imccyu, @turtle1999
- 插件组合包支持按顺序加载多个 patch 文件，原有单文件写法仍可使用 @turtle1999
- 新增 --dump-config-schema，导出 Cordis 配置及 patch 的 JSON Schema，辅助配置编写与静态检查 @turtle1999
- Remote 支持双向流及二进制结果传输，减少 Office 预览等大文件的编码开销；工作区文件读取统一为 readBytes，插件需迁移旧接口 @imccyu, @yudshj
- Agent 预设改由插件组合包声明和安装，可通过创造模式创建或覆盖；设置页保留查看与选择，移除复制、删除和打开目录入口，旧目录预设需迁移 @turtle1999
- 设置改由当前 Profile 的插件配置保存，支持声明过的实时更新字段；旧 settings.yaml 仅尝试导入一次，自定义设置插件需适配 @turtle1999
- 工具返回的文字和图片改按统一的估算 token 预算保留首尾，修复 MCP 图片在文字截断后不可用的问题，并提供被省略内容的读取地址。自定义 spill-policy 配置中的 maxInlineBytes 需改为 maxInlineTokens，按 token 数重新设置预算 @CreatixChu
- 插件可声明无需重载的配置字段；仅修改这些字段时保留运行中的插件实例 @turtle1999
- 插件安装和启动会检查与当前 DSH 版本的兼容性；不兼容时说明原因，并可对确切版本授予例外 @turtle1999

## 2026/09/22

### DeepSeek Harness 0.1.7-alpha.2 发布 >!打磨滚动跟随，附一批修复!<

#### 体验优化

- 稳定会话与工作过程组的滚动跟随；改善历史分页与轮次跳转，并减少发送消息的瞬间跳动或重复显示 @imccyu
- 统一会话区域各代码块样式，支持复制/换行，并改善差异内容和行号展示 @yixiangihsiang
- 重新编辑排队消息时保留换行，避免多行内容发送给模型时合并成一行 @turtle2099
- Agent Team 成员的初始任务增加查找队友和联系 Lead 的指引，明确按成员名称发送消息 @Dudu-0223
- 首次安装插件且未配置源时，优先寻找最优可访问 npm 源；保留手动选择和私有源配置 @LegGasai

#### 问题修复

- 修复消息中长文件名越出气泡、拖动文件改动审阅浮窗后下拉菜单错位的问题 @sjw1231
- 修复含特殊内容的 Excel 文件无法预览或内容丢失的问题 @yudshj
- 修复持久 PowerShell 命令完成后仍需额外等待的问题 @Elevator14B
- Excel 预览随面板大小变化自动调整，并保留当前工作表与选中单元格 @yudshj
- 修复连续完成多个后台命令或一次性子代理任务后，会话停住并等待用户输入的问题；默认不再限制任务完成后连续唤醒 Agent 的次数，仍可显式配置上限 @turtle1999
- 修复语音输入切换识别语言或识别器时设置保存失败的问题，选择立即生效并在重启后保留 @LegGasai
- 模型发现候选列表优先显示可读名称，缺失时显示模型 ID；仍可按名称或 ID 搜索，并保留原始 ID 用于添加 @LegGasai
- 修复 Web 服务重启后显示已连接却无法继续显示回复的问题；原页面在应用就绪后恢复连接，保留会话历史和输入草稿 @imccyu

#### 其他变更

- 工具返回的文字和图片改按统一的估算 token 预算保留首尾，修复 MCP 图片在文字截断后不可用的问题，并提供被省略内容的读取地址。自定义 spill-policy 配置中的 maxInlineBytes 需改为 maxInlineTokens，按 token 数重新设置预算 @CreatixChu
- 将 Cordis 等 vendor 包与 Node Addon System 的自动依赖更新限制为同一次版本内的补丁版本，避免安装时自动引入新的次版本 @imccyu

### DeepSeek Harness 0.1.7-alpha.1 发布 >!Session 升到 V4，设置与 Agent 预设改由插件组合包接管!<

#### 体验优化

- 侧边栏会话支持置顶、归档管理、筛选、撤销归档及从搜索结果恢复 @Yifffan
- 对运行中会话归档，会列出受影响的回合、子代理、任务和提醒，新增「停止并归档」确认 @LegGasai
- 新增「工作过程展示」「性能与用量」「开发者工具」设置；连续思考与工具调用合并为可折叠过程组，支持简洁、详细及运行中完全展开。开发者工具默认开启，关闭时仍显示第三方会话标签页 @lsdsjy, @std4453, @imccyu
- 可在任务列表中确认停止运行中的任务；长时间运行的命令可按配置在等待超时后转入后台继续执行，工作流也支持后台运行 @LegGasai
- 全新安装首次启动时自动创建默认工作区和空白会话，无需先选择文件夹 @kermanx
- 会话右上角菜单新增反馈入口，可直接提交当前会话的反馈 @Kaige-Gao
- 文件预览在回合结束后自动更新，并支持响应本地文件变化 @grllll
- 文件预览、交付卡片和改动审阅支持使用系统默认或其他关联应用打开文件、显示文件位置，不支持预览的文件也可直接打开 @CreatixChu
- 文件改动审阅默认使用左右分栏，支持代码高亮和左右同步滚动 @CreatixChu, @yixiangihsiang
- 文件改动卡片支持悬停查看单栏差异，无需先打开侧边栏；侧边栏仍默认左右分栏 @yixiangihsiang
- 调整文件交付指引，优先在回复中展示结果，减少交付卡片与正文的重复展示 @CreatixChu
- 统一界面图标、状态标记、菜单和滚动条的视觉样式，保留失败与中断状态的清晰提示 @yixiangihsiang
- 优化会话中设置、目标、待办、定时任务及多种工具的历史结果展示，由 JSON 调整为更紧凑的卡片展示 @kermanx
- 改善长对话的初始化加载、轮次导航跳转、加载历史开销 @imccyu, @tianyicui
- Team 工具统一以成员名称作为操作目标；子代理和 Team 统一空闲/就绪状态显示 @Dudu-0223
- Team 任务看板改为只读，任务创建和更新由 Agent 通过工具完成 @Dudu-0223
- 后台任务列表支持展开查看实时输出 @LegGasai
- 内置 Agent 模式提供用途说明、使用指南和示例任务，帮助选择适合的模式 @ZiyaZhang
- 模型页统一为「添加模型提供商」入口，可在第三方提供商和自定义 API 之间切换并保留草稿 @LegGasai
- 工作区会话列表分批展开，运行中会话及有运行中子代理的父会话保持可见 @turtle2099
- 输入栏空间不足时自动将模型名称收为图标，空间恢复后重新显示，减少控件换行 @turtle2099
- 侧边栏 Excel 预览支持只读预览 XLSX、XLS、CSV 和 TSV，可切换工作表、选择和复制单元格、查看公式；部分不支持内容会提示 @yudshj, @imccyu
- PDF、Office 和图片预览统一缩放控件，默认适应宽度，支持百分比缩放和手势缩放，并保留当前标签页的缩放比例 @yudshj

#### 问题修复

- 修复 Web 部署在反向代理的子路径下无法正常访问的问题 @mektpoy
- 修复包含旧子代理通知的会话通过 Messages 协议继续对话时请求失败的问题 @LegGasai
- 修复「新会话」误复用已有聊天历史或被其他 DSH 实例占用的空白会话的问题 @LegGasai, @turtle1999
- 无法读取的可选插件包不再直接中止 Profile 加载，并在插件管理页保留错误信息和禁用、移除操作 @turtle1999
- 插件安装弹窗可在等待期间立即关闭，并可重新查看同一安装任务；连接异常后会尝试恢复结果，无法确认时明确提示 @LegGasai
- 自定义模型提供方的 API 地址示例随协议切换，避免 Anthropic Messages 地址重复添加 /v1 @LegGasai
- 修复侧边栏 Markdown 预览中的本地图片加载，支持相对文档路径、中文、空格及 URL 编码 @LegGasai
- 主动压缩会预留模型输出预算和额外上下文空间，减少长输出后才触发压缩而导致的上下文溢出 @Dudu-0223
- 修复会话重新打开时，插件投影缓存中部分特殊 JSON 字段丢失的问题 @tianyicui
- 修复源码启动时受模块运行时解析行为影响导致的初始化失败，并支持 link 到本地开发中的插件 @imccyu
- 修复启用 Playwright 浏览器插件后，新会话、子代理及其他 Agent 创建失败的问题 @mektpoy
- 修复极简模式的持久 Bash、PowerShell 取消时错误显示为 [object Object] 的问题 @imccyu
- DeepSeek Files API 返回空内容或截断 JSON 时，报错会包含失败操作和 HTTP 状态 @tianyicui
- 修复 Windows 沙箱可删除授权目录之外文件的问题，并阻止跨工作区删除 @Elevator14B
- 修复已受理或运行中的会话在刷新列表、重连后被错误显示为空白新会话的问题 @liukx0205
- 新建会话失败时显式反馈失败原因 @LegGasai
- 修复计划审阅在其他面板打开期间到达后，「查看全文」和侧边栏预览失效的问题 @LegGasai
- 设置导航支持独立滚动，窗口较矮或分区较多时可访问底部条目 @grllll
- 修复 pi-ai 处理大型流式工具参数时阻塞整个 DSH 进程的问题 @turtle1999
- 修复取消轮次时结束记录写入失败或混入内部调用栈的问题 @kermanx
- 普通 Bash 调用不再因无须使用的权限说明为空而失败，权限提升仍需提供有效理由 @turtle1999
- 修复多个带检查工具的 Agent 预设共存时，重复注册导致预设加载失败的问题 @turtle1999
- 修复 Pkg 运行时并发首次加载 Native addon 时崩溃或加载失败的问题 @koalazf99
- 修复 macOS「从应用打开」菜单重复列出同一应用的问题，保留不同名称的并存安装 @Yifffan
- 修复左右分栏差异滚动到边缘时回弹、空白区域背景不一致及长路径遮住文件名末尾的问题 @sjw1231

#### 其他变更

- Session 日志升级为 V4，新增面向开发者的批量迁移工具，并兼容部分 V3 会话缺少轮次结束记录的情况 @tianyicui, @kermanx
- 仅保存在自定义事件中的附件不再自动读取或导出，插件需适配 @tianyicui
- 官方 DeepSeek 适配器仅使用 Messages API，移除 Chat Completions 和 protocol 选项；旧配置需删除 protocol 并使用 Messages 兼容地址 @tianyicui
- 插件可通过 locale 数据结构声明多语言标题和描述，通过 package.json 声明图标，并用于插件管理页面展示 @imccyu, @turtle1999
- 插件管理中的安装支持选择官方源、npmmirror 镜像站或自定义源，并提供安装示例、进度展示 @LegGasai, @Yifffan
- 插件组合包支持按顺序加载多个 patch 文件，保留原有单文件写法。插件可声明无需重载的配置字段，仅修改这类字段时可保留运行中的实例 @turtle1999
- 新增 --dump-config-schema，导出 Cordis 配置及 patch 的 JSON Schema，辅助配置编写与静态检查 @turtle1999
- Remote 支持双向流，普通调用和 Office 预览结果支持二进制传输，减少大文件编码开销；工作区文件读取统一为 readBytes，插件需迁移旧接口 @imccyu, @yudshj
- 精简创造模式提示词，按需加载插件开发参考、模板和旧预设迁移指引；支持查询运行中插件的配置字段与约束，Shell 提供当前 Profile 的名称与目录 @turtle1999
- Agent 预设改由插件组合包声明和安装，可通过创造模式创建或覆盖；设置页保留查看与选择，移除复制、删除和打开目录入口，旧目录预设需迁移 @turtle1999
- 设置改由当前 Profile 的插件配置保存，支持声明过的实时更新字段；旧 settings.yaml 仅尝试导入一次，自定义设置插件需适配 @turtle1999
- 内置浏览器在 Web 默认关闭，在 Electron 中默认启用，可选择聊天链接在内置浏览器或新标签页打开 @turtle2099
- 新增实验性语音转写插件，首次使用需下载识别模型至本地；下载失败时显示具体原因、下载来源和恢复建议 @LegGasai

## 2026/09/17

### DeepSeek Harness 0.1.6-alpha.2 发布 >!插件管理页来了，附赠几个 Breaking Changes!<

#### 新增功能

- 新增插件管理页，支持插件安装和修改配置，支持实时开启禁用插件 @LegGasai, @turtle1999
- 会话新增回合结束时文件改动卡片，并支持在侧边栏逐文件对比审阅 @CreatixChu
- 支持在侧边栏预览 Office 文件，目前支持 Word、Excel 和 PowerPoint 类型 @yudshj
- 支持在侧边栏以浏览器模式访问指定 URL @imccyu
- 支持在侧边栏打开 Subagent 会话 @imccyu
- 支持在侧边栏预览提交计划 @LegGasai

#### 体验优化

- 工作区列表支持按目录层级分组 @turtle1999
- 侧边栏布局支持持久化，刷新前后侧边栏终端维持连接 @LegGasai
- 改善文件引用与侧边栏操作，支持直接打开已有文件，并在首次发送消息前使用文件预览和终端 @LegGasai, @Dudu-0223
- 统一输入框菜单的键盘操作，支持方向键选择、Enter 或 Tab 确认、Escape 关闭 @liukx0205
- Trajectory 统一展示文本、图片和文件附件，预览支持附件缩略图 @sjw1231
- 思考内容支持紧凑的 Markdown 排版 @tianyicui
- 上下文用量移至输入框底部，点击可查看明细 @LegGasai
- 改善 CLI 及 Web 启动等候时间 @imccyu

#### 问题修复

- 启动失败时分类显示错误和等待中的服务，并将完整诊断保存到日志文件 @turtle1999
- 修复 pi-ai 视觉模型被识别为仅支持文本的问题，支持手动调整输入类型 @Kingwl, @LegGasai
- 修复重启后待处理的 Inbox 消息无法恢复的问题 @kermanx
- 修复 Messages API 地址拼接及历史工具输入格式异常导致的请求失败 @Magolor, @LegGasai
- 修复重复申请当前有效权限模式时仍需审批的问题 @turtle1999
- 修复 Windows 执行 PTC 和 Shell 命令时控制台窗口闪现的问题 @07akioni
- 会话被其他 DSH 实例占用时，提示退出对应实例后重试 @07akioni
- 修复会话宽度拖拽区域遮挡内容，以及嵌套悬浮提示重叠的问题 @yixiangihsiang, @winewill
- Web 用户终端使用系统用户权限，不受 Agent 沙箱模式限制 @LegGasai

#### 其他变更

- 默认模型列表移除 V4 Flash 和 V4 Flash Vision Exp @tianyicui
- 插件依赖解析模式调整为运行时解析，插件管理支持运行时卸载，请开发者检查插件加载和卸载逻辑 @imccyu
- CLI 支持用 dsh <profile> 启动指定 Profile @turtle1999
- 可继续对话的 Subagent 链默认最多同时保留 8 个子代理、委派深度为 1，可在设置中调整 @Dudu-0223, @ZiyaZhang
- 创造模式移除原 Cordis 动态定义及运行工具，调整为通过 Plugin Manager 安装持久化插件 @turtle1999
- 客户端 Session 会话支持多实例共存，相关 API 及 slot 有变化 @imccyu

## 2026/09/15

### DeepSeek Harness 0.1.6-alpha.1 发布 >!0.1.6 系列首个版本，又是成堆的 Breaking Changes!<

#### 新增功能

- Web 侧边栏新增终端，支持多标签、Shell 选择和刷新后恢复 @LegGasai
- 设置中新增已归档会话列表，支持查看和恢复会话 @tianyicui
- MCP 支持发现和读取资源、使用 URI 模板。内置 Profile 配置 MCP 服务器后可使用共享资源工具 @tianyicui
- Headless 支持从标准输入接收任务，用 --session-id 继续已有会话，用 --json 逐行输出 JSON 运行事件 @lsdsjy
- 扩展文件、命令及 PTC 工具，支持 DSH 在本地运行，通过 SSH 使用远端工作区 @tianyicui
- 新增实验性 Browser Use 支持，包含 Playwright MCP、Chrome DevTools MCP 和 Stagehand 浏览器后端 @tianyicui
- 新增实验性 Computer Use 支持，可通过 Cua Driver MCP 或原生驱动操作本机、获取截图 @tianyicui
- 新增实验性 Auto review 模式 @pku-xht

#### 体验优化

- 文件、Skill 引用及交付文件链接默认由侧边栏预览 @LegGasai
- 支持在 Agent Presets 设置中关闭模式切换 UI @ZiyaZhang
- 优化文件预览，保留文件树滚动位置，图片和 PDF 随面板适配，并简化预览器选择及加载、格式提示 @Yifffan
- Trajectory 支持展开和复制 JSON 字符串、查看 PTC 代码及调用结果，推理默认展开，并恢复记录中的运行耗时 @kermanx
- 调整输入框加号菜单的分组，将文件添加入口移入菜单，移除独立附件按钮，并统一斜杠菜单的中英文命令展示 @CreatixChu, @Yifffan
- 连接提示区分自动与手动重连，支持点击重试，并减少提示闪烁 @Yifffan
- 轮次运行超过一小时后，耗时按小时、分钟和秒显示 @lsdsjy
- 为适配 DeepSeek V4.1，调整图片缩放和 Token 估算，提高默认请求图片尺寸和编码质量 @CreatixChu
- 提升持久 Bash 处理大量历史输出时的效率 @turtle2099
- 文档站的 Mermaid 图表支持全屏查看、缩放和平移 @grllll
- Node PTC 的 run_code 支持按次设置超时时间，默认 120 秒、最多 600 秒 @tianyicui
- MCP 升级至官方 SDK v2，支持协议协商、工具分页，以及未提供工具的服务器 @tianyicui
- 推理和压缩摘要展开后，标题随滚动吸顶，方便折叠，且不遮挡摘要中的代码复制按钮 @Chinesezjc
- 改善 Web 终端文字和光标对比度，切换主题时保留应用配色；刷新后的新视图暂不恢复该配色 @LegGasai

#### 问题修复

- 修复会话最近更新排序，保留刷新后的手动顺序，并将新建空白会话置顶 @Dudu-0223
- 修复按轮次分叉时带入后续输入和设置的问题 @Dudu-0223
- 修复工具说明含双花括号时，PTC 提示词生成失败或文字被误替换的问题 @kermanx
- 修复 Linux 子进程终止和清理时的等待及退出结果判定问题 @turtle1999, @tianyicui
- 可选插件启动失败不影响其他可用插件，必需插件失败时退出；修复 Web 服务恢复后的模块路由注册 @turtle1999
- 修复鼠标悬停或键盘聚焦短 Markdown 表格时，页面位置发生跳动的问题 @07akioni
- 文件编辑卡片按行展示改动和上下文，修正增删行数统计，大范围替换采用整段展示 @turtle2099
- 子代理完成通知改为仅传递正文，修复推理块导致父会话 Messages 请求失败的问题；已保存通知不变 @tianyicui

#### 其他变更

- 新增 image offload 会话事件，记录请求中省略的历史图片，并在会话恢复和分叉时保留该记录 @CreatixChu
- DeepSeek 默认改用 Messages 协议，并支持通过 Files API 复用已上传图片。自定义 API 地址保留不变。如果手动配置了旧官方根地址，请移除该配置或改为 https://api.deepseek.com/anthropic @LegGasai, @tianyicui
- 默认不再启用 Ralph，需要使用时请手动启用 @tianyicui
- 移除内置 E2B 执行后端，相关自定义配置需调整 @tianyicui
- PTC 包名和服务名统一为 ptc-runtime 系列，旧名称不再兼容，自定义插件和配置需更新 @tianyicui
- 工作流执行器改为 workflow-ptc，遵循会话文件策略；自定义配置需更新名称，暂不支持 Python PTC @tianyicui
- agent/session-start 改为异步串行的 agent/created，首次模型请求等待初始化完成，相关插件及注册调用需适配 @kermanx
- 弃用 Session 的同步历史读取接口 snapshotEvents、eventAt 和 ownEvents @kermanx
- 实验性 Team 模式统一使用 spawn_teammate，关闭 subagent 和 subagent_fork，默认队友创建上限从 8 增至 16 @Dudu-0223
- Node PTC 改用独立进程执行，遵循会话文件策略并限制输出和堆内存；process.env 为空，依赖旧执行环境的代码需适配 @tianyicui
- 配置热更新取消事务回滚：解析失败保留原配置，插件激活失败可能部分生效，需修正配置后恢复 @turtle1999
- SandboxProvider.confine 和 ShellExecutor.start 改为可取消的异步接口，准备时间计入超时；修复 POSIX 符号链接与父目录组合、Windows 驱动器相对路径解析 @tianyicui
- 请求图片缓存移至 DSH_HOME/cache/attachments/request-images，删除后可重建；原图保留，旧缓存不自动清理 @turtle1999
- 使用 DeepSeek 模型适配器且连接官方 API 端点时，支持随请求上报会话事件，当前实验性开启，可通过配置关闭 @tianyicui

## 2026/09/10

### DeepSeek Harness 0.1.5-rc.2 发布 >!打磨反馈与文件卡片细节!<

#### 体验优化

- 优化反馈提交体验：点赞和点踩均通过弹窗确认后提交，提交失败时保留已填写内容并给出提示 @yixiangihsiang
- 优化交付文件卡片的排版和对话间距，更新代码文件图标，让文件更易辨认、界面更紧凑 @yixiangihsiang

### DeepSeek Harness 0.1.5-rc.1 发布 >!0.1.5 系列首个候选版本，汇总 v0.1.2-rc.1 以来全部变更!<

作为 0.1.5 系列的首个候选版本，本版本汇总了自 v0.1.2-rc.1 以来的主要用户和开发者相关变更。

#### 新增功能

- DeepSeek 模型适配器新增 DeepSeek-V41-Flash（deepseek-flash）支持文本、图片及会话历史中的系统提示词更新。新会话默认使用该模型，配置文件显式指定模型时以配置值为准 @LegGasai
- Web 支持上传任意类型的通用文件：文件与图片可在同一预览区混排，后台上传支持进度、取消与会话切换续显，模型可通过已保存路径使用现有文件工具按需读取 @CreatixChu
- 可继续对话的子代理支持消息排队、编辑、删除、单条或全部 Steer 与停止操作；排队消息发送期间显示「发送中」，并暂不可编辑、删除或 Steer @Dudu-0223, @LegGasai
- 支持动态修改系统提示词且不破坏 KV Cache，模型需显式声明支持 @tianyicui
- Web 右侧 Sidebar 支持多标签、分栏、全屏以及 Markdown、代码、HTML、PDF 和图片预览，包括子代理和未激活会话的文件；模型可显式交付文件，并可在 Sidebar 中预览、用默认应用打开或在文件管理器中定位。原 Detail 面板已移除 @imccyu, @Yifffan, @yixiangihsiang, @CreatixChu, @yudshj
- 模型探测新增对自定义模型提供商 models 对象和 Anthropic 原生模型列表的支持，并支持回填模型名称、上下文窗口及最大输出 token @LegGasai
- 所有出站网络请求都会遵循启动环境中的 HTTP_PROXY、HTTPS_PROXY、ALL_PROXY 与 NO_PROXY 配置 @LegGasai
- Web 顶栏新增「在应用中打开」，可用已安装的编辑器、IDE、终端或文件管理器等打开 Workspace @yixiangihsiang
- 反馈可独立提交，无需继续对话；/feedback 命令支持提交明细反馈内容，提交时附带相关会话内容 @tianyicui, @Chinesezjc, @CreatixChu

#### 体验优化

- Web 可直接显示顶层及 PTC 嵌套 read_image 的图片结果，以及模型回复中引用的 POSIX 绝对路径本地图片，包括工作区外截图；加载失败时显示替代文字或原路径 @Chinesezjc, @kermanx
- Skill 选择器支持模糊搜索；优化聊天气泡中的 Skill 和命令引用 @LegGasai
- 调整会话内可点击链接的颜色、hover/focus 样式和分类图标，优化 Markdown 链接、文件引用、网页来源、产物链接与 Workflow 成员链接的辨识度 @yixiangihsiang
- Windows 上的本地非终端子进程不再弹出控制台窗口 @turtle1999
- Agent Team 的 send_message 统一采用 steer 语义，并在跨 Agent 和冷恢复投递中保留发送者归属与顺序 @Dudu-0223
- 改善长会话打开、恢复和持续对话时的卡顿，降低内存占用 @imccyu, @tianyicui, @Dudu-0223
- 引用较长会话时，模型可按需读取预览中未展示的内容 @tianyicui
- 改善设置面板的标签、开关状态样式，改善浅色和深色主题下的显示效果，改善本地化与可访问性 @LegGasai, @turtle2099
- PTC 模式下支持展开查看命令及其输出 @tianyicui
- 改善 Web 输入框的菜单层级、提示文字和间距；会话统计改为两个可展开的摘要，分别查看轮次与速度、精确 Token 用量与缓存命中 @Yifffan
- 内置斜杠命令说明支持中文，并随界面语言即时更新；切换语言时保留已打开菜单和查询内容 @Kaige-Gao

#### 问题修复

- 用户在 Web 中暂停目标会立即终止当前模型轮次，且模型不能自行恢复；恢复必须由用户触发，尚未激活的目标也显示恢复入口 @mektpoy
- 修复 DeepSeek 流式工具调用的续传分片用空值覆盖调用 ID 或名称的问题，避免工具以空名称失败并写入无法重新打开的会话记录 @LegGasai
- 修复 Python SDK 单文件 runtime 将 Bash 中以 node 开头的命令错误重写为 dsh runtime 的问题 @imccyu
- 修复从会话搜索结果进入会话后仍停留在搜索界面的问题；目标会话会在所属 Workspace 中展开并滚动到可见位置 @Dudu-0223
- 修复 Windows 盘符根目录 Workspace 的路径分隔符、标题与绝对路径校验，确保盘符根目录可以正常使用 @turtle1999
- 修复 Web 断线后无法自动恢复的问题 @LegGasai
- 修复发送消息或调整窗口后，聊天不再自动滚动到底部的问题 @tianyicui
- 修复 Windows 上 Python SDK 运行时可能出现的启动崩溃 @tianyicui
- 修复会话运行中发送按钮与 Enter 的行为不一致：两者均遵循「繁忙时的发送行为」设置，并明确提示排队或插话发送 @lsdsjy
- 拒绝不含正文或附件的空消息及空白队列编辑，保留仅发送图片或文件的能力 @turtle1999
- 修复查找项目根目录遇到权限或 I/O 错误时误用上级项目指令的问题，相关错误会直接报告 @turtle1999
- 修复折叠的思考摘要直接显示 Markdown 加粗标记的问题，展开内容保持完整 @turtle1999
- 修复模型目录变化后失效的 pi-ai 配置导致整个模型设置入口消失的问题；错误项保留诊断和修复入口 @LegGasai
- 在发现模型或创建自定义 provider 前校验并规范化 Base URL，并直接提示无效地址 @turtle2099
- 修复 Windows Web 界面的原生文件夹选择器可能在其他窗口后方打开的问题 @Elevator14B
- 修复在 Composer 中输入空白字符后占位提示仍然显示的问题 @CreatixChu
- 修复工具筛选后的子代理仍收到不可用文件和 Web 工具指导的问题 @koalazf99
- 拒绝 MCP 工具发现中的重复分页游标，避免启动或同步持续等待，并保留上一组可用工具 @grllll

#### 其他变更

- **会话数据格式升级至 V3：** 受支持的旧日志通过版本迁移生成新版日志并保留原文件，升级后的会话不支持降级读取。自定义日志读取器需适配 V3，跨版本迁移细节见 session-format-v2-to-v3/README.md @tianyicui, @Magolor, @imccyu
- **Session 生命周期变更：** Session persistence API 改为由生命周期持有的 SessionHandle；agentLoop.create() 改为异步，新增 session 锁，同一 session 至多被一个进程持有 @turtle1999, @imccyu
- **默认工具调整：** SDK、Headless 和 ACP 默认使用 read、write、edit 编辑文件；Web minimal 与 Python sdk-minimal 默认仅提供持久 shell，str_replace_editor 需显式启用，持久 Bash 输出统一报告退出或超时状态 @koalazf99
- 改善 Windows 和部分 Linux 环境下普通子进程的清理，减少任务停止后的后台进程残留；普通 subprocess handle 不再暴露 pid，终端 handle 不受影响 @pku-xht
- 统一未观察文件写入与编辑失败的 FS_NOT_OBSERVED 诊断，保留文件路径、结构化错误码和原始原因 @turtle1999
- Python SDK 新增 macOS x64 runtime wheel，可在 Intel 架构的 Mac 上安装并运行随包 runtime @koalazf99
- 升级 pi-ai 版本至 0.85.1 @tianyicui
- 可选子代理插件的内置运行时升级至 Codex 0.153.4 和 Claude Code 2.1.263；显式模型配置保持不变，未配置模型时 Codex 使用上游默认值 @koalazf99
- 自定义 persona 配置拆分为前缀和后缀，旧配置及相关常量需要适配 @tianyicui
- **插件 Agent API 调整：** 移除 ctx.agent，调用方需显式传递 Agent；同时修正可继续对话的子代理归属，避免它们被当作根会话参与定时调度 @kermanx
- **Inbox API 调整：** Inbox 改为类型接口，不再导出可构造的运行时类；插件通过 agent.inbox 读写待处理消息，hasPending 与 claim 不再属于公共接口 @kermanx
- **Web 插件面板 API 调整：** 插件可通过 sidebar.panellist 与 main 注册全局面板；原 conversation Slot 迁移为 main 的 conversation key @imccyu
- 实验性 Agent Teams 包现可从 npm 安装；用户需显式添加 profile，不默认启用 @imccyu

## 2026/09/09

### DeepSeek Harness 0.1.5-alpha.2 发布 >!右侧 Sidebar 现在能预览文档了!<

#### 新增功能

- 右侧 Sidebar 新增常见文档类型预览，支持 Markdown、代码高亮、HTML、PDF、图片 @imccyu, @Yifffan, @yixiangihsiang, @CreatixChu, @yudshj
- 支持模型显式在会话中交付文件，并支持在右侧 Sidebar 预览、用默认应用打开、在文件管理器中定位 @yudshj, @CreatixChu
- /feedback 命令新增支持提交明细反馈内容 @CreatixChu

#### 体验优化

- 改善设置界面的本地化与可访问性：设置入口补充本地化无障碍名称，中文显示对话模式与内置模型说明 @turtle2099

#### 问题修复

- 修复模型目录变化后失效的 pi-ai 配置导致整个模型设置入口消失的问题；错误项保留诊断和修复入口 @LegGasai
- 在发现模型或创建自定义 provider 前校验并规范化 Base URL，并直接提示无效地址 @turtle2099
- 修复 Windows Web 界面的原生文件夹选择器可能在其他窗口后方打开的问题 @Elevator14B
- 修复在 Composer 中输入空白字符后占位提示仍然显示的问题 @CreatixChu
- 修复工具筛选后的子代理仍收到不可用文件和 Web 工具指导的问题 @koalazf99
- 拒绝 MCP 工具发现中的重复分页游标，避免启动或同步持续等待，并保留上一组可用工具 @grllll
- 修复 npm 安装需要依赖 fs-ext 本地编译的问题 @imccyu

#### 其他变更

- Session 数据格式当前为 V3 版本，跨版本迁移细节见 session-format-v2-to-v3/README.md @tianyicui
- **Web 插件面板 API 调整：** 插件可通过 sidebar.panellist 与 main 注册全局面板；原 conversation Slot 迁移为 main 的 conversation key @imccyu
- **极简模式默认工具调整：** Web minimal 与 Python sdk-minimal 默认仅提供持久 shell，str_replace_editor 改为显式启用；持久 Bash 输出统一报告退出或超时状态 @koalazf99
- 实验性 Agent Teams 包现可从 npm 安装；用户需显式添加 profile，不默认启用 @imccyu

## 2026/09/08

### DeepSeek Harness 0.1.5-alpha.1 发布 >!Session 格式升级到 V3，又是个巨大的 Breaking Changes!<

#### 新增功能

- 支持动态修改系统提示词且不破坏 KV Cache，模型需显式声明支持 @tianyicui
- 新增实验性右侧 Sidebar，支持多标签、分栏与全屏；聊天文件链接和产出文件支持 Sidebar 打开，并移除原 Detail 面板 @imccyu

#### 体验优化

- 改善 Web 输入框的菜单层级、提示文字和间距；会话统计改为两个可展开的摘要，分别查看轮次与速度、精确 Token 用量与缓存命中 @Yifffan
- 内置斜杠命令说明支持中文，并随界面语言即时更新；切换语言时保留已打开菜单和查询内容 @Kaige-Gao
- 可选子代理插件的内置运行时升级至 Codex 0.153.4 和 Claude Code 2.1.263；显式模型配置保持不变，未配置模型时 Codex 使用上游默认值 @koalazf99

#### 问题修复

- 修复会话运行中发送按钮与 Enter 的行为不一致：两者均遵循「繁忙时的发送行为」设置，并明确提示排队或插话发送 @lsdsjy
- 修复模型可自行恢复用户已暂停目标的问题；暂停后须由用户恢复，尚未激活的目标也会显示恢复入口 @mektpoy
- 修复聊天中本地图片路径无法显示的问题，支持模型回复引用的 POSIX 绝对路径图片，包括工作区外截图；加载失败时显示替代文字或原路径 @kermanx
- 拒绝不含正文或附件的空消息及空白队列编辑，保留仅发送图片或文件的能力 @turtle1999
- 修复查找项目根目录遇到权限或 I/O 错误时误用上级项目指令的问题，相关错误会直接报告 @turtle1999
- 修复折叠的思考摘要直接显示 Markdown 加粗标记的问题，展开内容保持完整 @turtle1999
- 修复 macOS 和 Linux 依赖 fs-ext 需要本地编译的问题 @imccyu

#### 其他变更

- **会话格式升级至 V3：** 恢复受支持的历史会话时生成新版日志并保留原文件，系统提示词纳入消息历史，旧 PTC 事件与 code 预设引用自动迁移。自定义日志读取器需适配新格式；升级后的会话不支持降级读取 @tianyicui
- **插件 Agent API 调整：** 移除 ctx.agent，调用方需显式传递 Agent；同时修正可继续对话的子代理归属，避免它们被当作根会话参与定时调度 @kermanx
- **Inbox API 调整：** Inbox 改为类型接口，不再导出可构造的运行时类；插件通过 agent.inbox 读写待处理消息，hasPending 与 claim 不再属于公共接口 @kermanx

## 2026/09/07

### DeepSeek Harness 0.1.3-alpha.2 发布

#### 新增功能

- 升级 pi-ai 到 0.85.1，支持更多新模型 @tianyicui
- Web 顶栏新增「在应用中打开」，可用已安装的编辑器、IDE、终端或文件管理器等打开 Workspace @yixiangihsiang
- 可继续对话的子代理支持消息排队、编辑、删除、单条或全部 Steer，以及停止操作 @Dudu-0223
- PTC 模式下支持展开查看命令及其输出 @tianyicui

#### 问题修复

- 修复 Web 断线后无法自动恢复的问题 @LegGasai
- 修复发送消息或调整窗口后，聊天不再自动滚动到底部的问题 @tianyicui
- 修复 Windows 上 Python SDK 运行时可能出现的启动崩溃 @tianyicui
- 改善 Windows 和部分 Linux 环境下的进程清理，减少任务停止后的后台进程残留 @pku-xht

#### 体验优化

- 改善长会话打开、恢复和持续对话时的卡顿，降低内存占用 @imccyu, @tianyicui, @Dudu-0223
- 引用较长会话时，模型可按需读取预览中未展示的内容 @tianyicui
- 排队消息新增「发送中」提示，发送完成前暂不可编辑、删除或 Steer @LegGasai
- 统一设置面板中标签、开关和插件状态的样式，改善浅色和深色主题下的显示效果 @LegGasai
- 反馈可独立提交，无需继续对话；提交时会附带相关会话内容，普通聊天不会触发这类上报 @tianyicui, @Chinesezjc

#### 其他变更

- 默认工具调整：SDK、Headless 和 ACP 默认使用 read、write、edit 编辑文件；Web minimal 和 sdk-minimal 保持不变 @koalazf99
- 自定义 persona 配置拆分为前缀和后缀，旧配置及相关常量需要适配 @tianyicui
- 普通 subprocess handle 移除 pid；终端 handle 不受影响 @pku-xht

## 2026/09/04

### DeepSeek Harness 0.1.3-alpha.1 发布 >!0.1.3 系列首个版本，Session 持久化 API 与 Session format 为破坏性变更!<

#### 新增功能

- Web 支持上传任意类型的通用文件：文件与图片可在同一预览区混排，后台上传支持进度、取消与会话切换续显，模型可通过已保存路径使用现有文件工具按需读取 @CreatixChu
- 所有出站网络请求都会遵循启动环境中的 HTTP_PROXY、HTTPS_PROXY、ALL_PROXY 与 NO_PROXY 配置 @LegGasai
- Python SDK 新增 macOS x64 runtime wheel，可在 Intel 架构的 Mac 上安装并运行随包 runtime @koalazf99
- read_image 的顶层与 PTC 嵌套工具调用会在 Web 工具卡中直接渲染图片，不再展示原始附件对象 @Chinesezjc
- 模型探测新增对自定义模型提供商 models 对象和 Anthropic 原生模型列表的支持，并支持回填模型名称、上下文窗口及最大输出 token @LegGasai

#### 问题修复

- 在 Web 中手动暂停目标会立即终止当前模型轮次，避免运行中的模型继续执行或在同一轮恢复目标 @mektpoy
- 修复 DeepSeek 流式工具调用的续传分片用空值覆盖调用 ID 或名称的问题，避免工具以空名称失败并写入无法重新打开的会话记录 @LegGasai
- 修复 Python SDK 单文件 runtime 将 Bash 中以 node 开头的命令错误重写为 dsh runtime 的问题 @imccyu
- 修复从会话搜索结果进入会话后仍停留在搜索界面的问题；目标会话会在所属 Workspace 中展开并滚动到可见位置 @Dudu-0223
- 修复 Windows 盘符根目录 Workspace 的路径分隔符、标题与绝对路径校验，确保盘符根目录可以正常使用 @turtle1999
- 修复 Session 缓存读取问题 @imccyu

#### 体验优化

- Skill 选择器支持模糊搜索；优化聊天气泡中的 Skill 和命令引用 @LegGasai
- 统一会话内可点击链接的颜色、hover/focus 样式和分类图标，优化 Markdown 链接、文件引用、网页来源、产物链接与 Workflow 成员链接的辨识度 @yixiangihsiang
- 统一未观察文件写入与编辑失败的 FS_NOT_OBSERVED 诊断，保留文件路径、结构化错误码和原始原因 @turtle1999
- Windows 上的本地非终端子进程不再弹出控制台窗口 @turtle1999
- Agent Team 的 send_message 统一采用 steer 语义，并在跨 Agent 和冷恢复投递中保留发送者归属与顺序 @Dudu-0223

#### 其他变更

- 破坏性变更：Session persistence API 改为由生命周期持有的 SessionHandle；agentLoop.create() 改为异步，新增 session 锁，同一 session 至多被一个进程持有 @turtle1999
- Session format 升级至 v2：旧 v0/v1 日志通过不可变的相邻 generation 迁移到当前格式，Assistant 流按 attempt 聚合进持久化 settlement，同时 Web 保持实时增量显示 @tianyicui
- 已知的性能缺陷：本版本存在一项已知的性能回退，可能影响部分历史 session 加载的响应速度，我们将在下一个版本中修复

## 2026/09/03

### DeepSeek Harness 0.1.2-rc.1 发布 >!首个候选版本，汇总 0.1.1-rc.2 以来全部变更!<

#### 新增功能

- 会话流默认在每个已完成回答前折叠过程内容，并默认折叠的「System prompt」 @07akioni, @lsdsjy
- 会话流正文宽度可自适应或拖拽调整 @yixiangihsiang
- 回答末尾显示 token 用量和耗时，可展开查看精确用量与详细统计 @hypatiamay, @ZiyaZhang, @Yifffan
- 会话视图提供覆盖完整历史的回合导航，可预览并跳转尚未载入的轮次 @LegGasai
- 统一界面次级文字层级，会话流支持字号调节，Markdown 表格随正文字号缩放 @yixiangihsiang
- 插件支持在模型设置页添加提供方登录配置 @LegGasai
- 界面支持第三方语言，并统一权限分类和标签的本地化表达 @tianyicui, @LegGasai, @imccyu, @ZiyaZhang
- 子代理模型选择支持 Agent 在授权范围内自主选择，也支持调用方指定提供方、模型、推理力度和最大输出长度，以及为 Claude Code、Codex 配置模型 @Dudu-0223, @pku-xht
- Python SDK runtime 新增 Windows x64 发行包 @tianyicui
- ACP 补齐标准会话控制、模型设置、MCP、权限和取消能力 @tianyicui, @pku-xht
- DeepSeek 官方适配器默认随请求提供已启用插件的包名和版本，可在配置中关闭 @tianyicui
- DeepSeek 官方适配器新增可选的 Session 日志增量上传，默认关闭 @tianyicui
- 新增实验性 Inspector 工具 @imccyu
- 新增实验性 Web Preview @imccyu
- 界面显示连接状态，容忍短暂服务端卡顿，并支持连接中断后的自动重试或立即重连 @imccyu
- 会话标题区域支持在不同视口宽度下查看活动的定时计划 @pku-xht
- 父 Agent 与可持续子 Agent 可通过 send_message 双向传递后续消息，取代单向 report 工具 @Dudu-0223

#### 体验优化

- 减少页面启动和会话初始化中的代码加载、数据传输与解析开销 @lsdsjy, @imccyu, @Kingwl, @kermanx
- 改善会话记录占用的磁盘空间 @Magolor
- 优化 / 与 @ 菜单的图标、目录加载和文件搜索，支持通过鼠标在目录层级间导航 @Yifffan, @LegGasai
- 会话运行中存在草稿时主按钮切换为「发送」，消息排队发送 @lsdsjy
- 输入框中的文件和会话引用在相邻文字编辑后仍保持有效 @LegGasai
- 切换会话后仍保留未提交的提问卡片草稿 @LegGasai
- 会话流中的流式回复代码块在生成期间持续显示语法高亮 @07akioni
- 会话流中的提问历史显示为可读的问答卡片，并标明取消或中断后的未提交状态 @LegGasai
- 图片发送后立即显示，压缩和上传在后台继续 @CreatixChu
- 上下文压缩会计入图片占用 @CreatixChu
- 轨迹视图支持展示用户、助手和工具结果中的图片 @CreatixChu
- 在本地文件系统模式下，模型可定位上传图片，并通过 read_image 读取没有扩展名的附件路径 @CreatixChu
- 调整图片压缩策略，压缩更快、上传体积更小，并改善超长截图的清晰度 @CreatixChu
- 会话日志截断尾部自动修复时输出警告并注明受影响会话 @turtle1999
- 插件列表按会话插件和全局插件分组，可切换 Agent Preset 查看组合、搜索其他预设 @LegGasai
- 改善会话与输入界面的菜单显示、滚动条、工具文件链接与 diff 统计 @Yifffan
- 减少 macOS 和 Linux 加载会话时不必要的文件系统检查 @LegGasai
- 提升长会话和密集实时消息的处理效率，降低内存占用以及流式回复、代码高亮、布局和导航预览的渲染开销 @Dudu-0223, @imccyu, @07akioni
- web_search 失败时报告实际端点和错误明细 @CreatixChu
- 调整首页标志的动画效果 @Yifffan
- 自定义模型发现复用 Profile 请求头；模型目录支持搜索和筛选 @LegGasai

#### 问题修复

- 修复 macOS 和 Linux 上持久 PowerShell 启动过早、输出不完整的问题 @tianyicui
- 修复 Linux 持久 Bash 在管道内部读取时提前返回空输出的问题 @LegGasai
- 修复 Bash 命令派生大量子进程时 macOS 宿主卡顿的问题 @LegGasai
- 修复 Windows 目录选择器截断含「开」等特定编码字符路径的问题 @tianyicui
- 修复会话视图中持久 Bash 与 PowerShell 结果无法展开的问题 @LegGasai
- 修复 Profile 配置的 Agent Preset 目录在启动时丢失的问题 @LegGasai
- 无法加载的 Agent Preset 会提前标记，并在切换失败时说明原因 @LegGasai
- Minimal preset 不再显示不适用的 /goal 命令 @Magolor
- 文件编辑工具接受当前操作未使用字段的 null 占位值 @lsdsjy
- PTC Mode 的 SDK 功能只能通过 run_code 调用，不再被模型当作普通工具直接调用 @CreatixChu
- 网关定期发送 WebSocket 心跳，避免空闲连接中断 @lsdsjy
- 修复新建空会话挤掉 Workspace 折叠列表已有会话的问题 @lsdsjy
- 修复系统提示词 workflow 分区顺序 @LegGasai
- 优化 NPM 包中的 peer dependency 依赖以改善包管理解析成本 @imccyu
- 修复 Node.js 24.0–24.11.1 上启动可能失败且 HMR 失效的问题 @imccyu
- 关闭设置窗口后，键盘焦点会返回设置入口 @LegGasai
- 会话运行中追加或排队发送的图片可正确回显并可靠投递；持续子代理的后续消息也支持图片 @CreatixChu
- 命令菜单打开时，Tab 可补全当前高亮的斜杠命令 @mektpoy

#### 其他变更

- 更新安全说明（SAFETY.zh.md）：DeepSeek Harness 尚未接受安全审计，沙箱、审批与权限控制不能保证隔离 @turtle1999
- 调整模型提示词顺序，使 Shell 使用指南稳定出现在其他工具指南之前 @LegGasai
- Remote 网关统一远程调用 API 与异常分发，旧版 APIProxy 已迁移并移除 @imccyu
- 会话视图工程大幅拆分，请面向诉求分层导入合适模块 @imccyu
- 网络访问 Web 界面时启用链接中的一次性 token 认证鉴权 @tianyicui
- 应用统一通过 dsh Profile 启动，包括 Python SDK、ACP 模式等 @tianyicui
- pi-ai 模型支持更新，并增加 vLLM 思考预算等配置 @tianyicui
- Headless 运行期间向 stderr 流式输出进度，stdout 只输出最终结果 @lsdsjy
- Code Mode 统一更名为 PTC mode，现有会话记录仍可读取 @tianyicui
- 默认启用公网 WebFetch（内置 SSRF 防护，公网请求不再逐次审批） @Dudu-0223
- 移除可选的 SQLite Session 持久化后端；已有内容不会删除，请使用旧版本导出 @tianyicui
- Python SDK、Headless、ACP 与自定义 Profile 默认提供 web_fetch @koalazf99
- Web PTC Mode 默认不再向模型提供通用 workflow 工具 @koalazf99
- Session.events 被按需读取 API seq、eventAt() 和 snapshotEvents() 取代 @kermanx
- SessionSeq 与 SessionLogOffset 使用强类型区分，本改造保持向前兼容 @tianyicui, @imccyu

## 2026/09/02

### DeepSeek Harness 0.1.2-alpha.5 发布 >!这次是纯修复，不 Breaking!<

#### 问题修复

- 修复从 0.1.1-rc.2 或 0.1.2-alpha.3 升级时，应用可能启动失败或者会话列表标题丢失的问题 @imccyu

## 2026/09/01

### DeepSeek Harness 0.1.2-alpha.4 发布 >!叕是个巨大的 Breaking Changes!<

#### 新增功能

- 父 Agent 与可持续子 Agent 可通过 send_message 双向传递后续消息，取代单向 report 工具 @Dudu-0223

#### 体验优化

- 自定义模型发现复用 Profile 请求头；模型目录支持搜索和筛选 @LegGasai
- 界面优化圆角、描边、轮次导航、投影效果 @yixiangihsiang, @LegGasai
- 改善超长会话在流式回复、界面布局、导航预览场景的渲染开销 @imccyu

#### 其他变更

- Python SDK、Headless、ACP 与自定义 Profile 默认提供 web_fetch @koalazf99
- Web PTC Mode 默认不再向模型提供通用 workflow 工具 @koalazf99
- Session.events 被按需读取 API seq、eventAt() 和 snapshotEvents() 取代 @kermanx
- SessionSeq / SessionLogOffset 强类型区分，请开发者关注兼容性 @tianyicui

### DeepSeek Harness 0.1.2-alpha.3 发布 >!叒是个巨大的 Breaking Changes!<

#### 体验优化

- 长会话右侧导航支持预览和跳转尚未载入的全部分页轮次 @LegGasai
- 改善长会话渲染的内存开销和代码高亮流畅度 @imccyu, @07akioni
- 优化权限标签多语言表达 @ZiyaZhang

#### 问题修复

- 会话运行中追加或排队发送的图片可正确回显并可靠投递；持续子代理的后续消息也支持图片 @CreatixChu
- read_image 可根据文件内容识别并读取没有扩展名的图片附件路径 @CreatixChu
- 命令菜单打开时，Tab 可补全当前高亮的斜杠命令 @mektpoy
- 修复后端卡顿可能造成网络连接被误判为断开的问题 @imccyu
- 修复会话标题中的定时计划列表在窄视口下偏移或越界的问题 @pku-xht

#### 其他变更

- 移除可选的 SQLite Session 持久化后端；已有内容不会删除，请使用旧版本导出 @tianyicui

## 2026/08/30

### DeepSeek Harness 0.1.2-alpha.2 发布 >!双是个巨大的 Breaking Changes!<

#### 新增功能

- 界面新增显示连接异常状态，支持自动重试和立即重连 @imccyu
- 会话标题区域支持查看活动的定时计划 @pku-xht

#### 体验优化

- 插件列表按会话插件和全局插件分组，可切换 Agent Preset 查看组合、搜索其他预设 @LegGasai
- 改善会话与输入界面的菜单显示、滚动条、工具文件链接与 diff 统计 @Yifffan
- 减少 macOS 和 Linux 加载会话时不必要的文件系统检查 @LegGasai
- 提升长会话历史和密集实时消息的处理效率 @Dudu-0223
- 回答末尾显示 token 用量和耗时，点击可查看详细统计 @Yifffan
- web_search 失败时报告实际端点和错误明细 @CreatixChu
- 权限分类使用本地化内容显示 @imccyu
- 调整首页标志的动画效果 @Yifffan

#### 问题修复

- 修复使用鼠标在 @ 菜单中下钻目录时面包屑丢失或路径消失的问题 @LegGasai
- 优化 NPM 包中的 peer dependency 依赖以改善包管理解析成本 @imccyu
- 修复 Node.js 24.0–24.11.1 上启动可能失败且 HMR 失效的问题 @imccyu
- 关闭设置窗口后，键盘焦点会返回设置入口 @LegGasai

#### 其他变更

- 恢复 0.1.2-alpha.1 中移除的 SessionEvent.ignorable @tianyicui
- Remote 网关提供统一的 RemoteError 调用异常封装 @imccyu

## 2026/08/28

### DeepSeek Harness 0.1.2-alpha.1 发布 >!又是个巨大的 Breaking Changes!<

#### 新增功能

- 会话流默认在每个已完成回答前折叠过程内容，并默认折叠的「System prompt」 @07akioni, @lsdsjy
- 会话流正文宽度可自适应或拖拽调整 @yixiangihsiang
- 会话流每个已完成回答后可展开查看精确 token 用量 @hypatiamay, @ZiyaZhang
- 会话视图提供紧凑的回合导航 @LegGasai
- 统一界面次级文字层级，会话流支持字号调节，Markdown 表格随正文字号缩放 @yixiangihsiang
- 插件支持在模型设置页添加提供方登录配置 @LegGasai
- 支持注册第三方语言，并补全多语言文本 @tianyicui, @LegGasai, @imccyu
- 开启子代理模型选择后，Agent 可在授权范围内选择提供方、模型和推理力度 @Dudu-0223
- 启动子代理时可指定提供方、模型、推理力度和最大输出长度 @pku-xht
- Claude Code、Codex 子代理支持配置模型 @pku-xht
- Python SDK runtime 新增 Windows x64 发行包 @tianyicui
- ACP 补齐标准会话控制、模型设置、MCP、权限和取消能力 @tianyicui, @pku-xht
- DeepSeek 官方适配器默认随请求提供已启用插件的包名和版本，可在配置中关闭 @tianyicui
- DeepSeek 官方适配器新增可选的 Session 日志增量上传，默认关闭 @tianyicui

#### 体验优化

- 改善页面启动流程，减少代码加载次数和数据量开销 @lsdsjy
- 改善会话初始化流程，减少数据传输解析开销，统一会话自有状态加载 @imccyu, @Kingwl, @kermanx
- 改善会话记录占用的磁盘空间 @Magolor
- 优化输入交互中的 / 与 @ 菜单图标、目录加载、文件搜索 @Yifffan, @LegGasai
- 会话运行中存在草稿时主按钮切换为「发送」，消息排队发送 @lsdsjy
- 输入框中的文件和会话引用在相邻文字编辑后仍保持有效 @LegGasai
- 切换会话后仍保留未提交的提问卡片草稿 @LegGasai
- 会话流中的流式回复代码块在生成期间持续显示语法高亮 @07akioni
- 会话流中的提问历史显示为可读的问答卡片，并标明取消或中断后的未提交状态 @LegGasai
- 图片发送后立即显示，压缩和上传在后台继续 @CreatixChu
- 上下文压缩会计入图片占用 @CreatixChu
- 轨迹视图支持展示用户、助手和工具结果中的图片 @CreatixChu
- 在本地文件系统模式下，模型可直接找到已上传图片的可读取位置 @CreatixChu
- 调整图片压缩策略，压缩更快、上传体积更小，并改善超长截图的清晰度 @CreatixChu
- 会话日志截断尾部自动修复时输出警告并注明受影响会话 @turtle1999

#### 问题修复

- 修复 macOS 和 Linux 上持久 PowerShell 启动过早、输出不完整的问题 @tianyicui
- 修复 Linux 持久 Bash 在管道内部读取时提前返回空输出的问题 @LegGasai
- 修复 Bash 命令派生大量子进程时 macOS 宿主卡顿的问题 @LegGasai
- 修复 Windows 目录选择器截断含「开」等特定编码字符路径的问题 @tianyicui
- 修复会话视图中持久 Bash 与 PowerShell 结果无法展开的问题 @LegGasai
- 修复 Profile 配置的 Agent Preset 目录在启动时丢失的问题 @LegGasai
- 无法加载的 Agent Preset 会提前标记，并在切换失败时说明原因 @LegGasai
- Minimal preset 不再显示不适用的 /goal 命令 @Magolor
- 文件编辑工具接受当前操作未使用字段的 null 占位值 @lsdsjy
- PTC Mode 的 SDK 功能只能通过 run_code 调用，不再被模型当作普通工具直接调用 @CreatixChu
- 网关定期发送 WebSocket 心跳，避免空闲连接中断 @lsdsjy
- 修复新建空会话挤掉 Workspace 折叠列表已有会话的问题 @lsdsjy
- 修复系统提示词 workflow 分区顺序 @LegGasai

#### 其他变更

- 更新 安全说明：DeepSeek Harness 尚未接受安全审计，沙箱、审批与权限控制不能保证隔离 @turtle1999
- 调整模型提示词顺序，使 Shell 使用指南稳定出现在其他工具指南之前 @LegGasai
- 旧版调用接口 APIProxy 已迁移并移除，请统一使用 @Remote 网关 @imccyu
- 会话视图工程大幅拆分，请面向诉求分层导入合适模块 @imccyu
- 网络访问 Web 界面时启用链接中的一次性 token 认证鉴权 @tianyicui
- 应用统一通过 dsh Profile 启动，包括 Python SDK、ACP 模式等 @tianyicui
- pi-ai 模型支持更新，并增加 vLLM 思考预算等配置 @tianyicui
- Headless 运行期间向 stderr 流式输出进度，stdout 只输出最终结果 @lsdsjy
- Code Mode 统一更名为 PTC mode，现有会话记录仍可读取 @tianyicui
- 默认启用公网 WebFetch（内置 SSRF 防护，公网请求不再逐次审批） @Dudu-0223

## 2026/08/21

### DeepSeek Harness 0.1.1-rc.2 发布

#### 体验优化

- DeepSeek 适配器支持优先通过 Files API 上传图像，并可复用已上传文件
- 优化图像预处理流程：根据模型要求自动缩放并转换为合适格式

### DeepSeek Harness 0.1.1-rc.1 发布

#### 新增功能
- DeepSeek 适配器新增多模态视觉理解模型 DeepSeek-V4-Flash-Vision-Exp
#### 问题修复
- 修复在输入框的 @ 引用前增删改文本时，潜在的布局问题
- 修复 Bubblewrap 沙箱内的受限进程可经 /proc/<pid>/root 绕过限制的问题
#### 体验优化
- 优化会话 Markdown 表格自适应表现、缓存命中率在 99.x% 时的精度显示、子代理会话标题切换交互
- ask_user_question 回答内容支持多行输入、自动换行、Shift+Enter 换行

## 2026/08/19

### DeepSeek Harness 0.1.0-rc.8 发布

#### 新增功能

- 增强多模态支持度，DeepSeek 模型适配器支持配置启用原生图片请求，/goal、/plan 等命令可接收图文输入，@ 菜单支持引用文件和会话
- Claude Code 与 Codex 子代理均可作为 Profile Bundle 按需安装，同时支持非交互权限模式和多个命名实例
- Windows PTY 终端支持持久 PowerShell 会话， 并在极简模式预设中默认支持

#### 问题修复

- 修复图片尺寸过大或历史图片累计载荷过高导致模型请求失败的问题
- 修正取消流式生成后已展示的回复前缀未带入后续提问和分叉会话
- 修复部分自定义 OpenAI 兼容网关因请求格式差异无法调用，以及推理内容回传可能缺失问题

#### 体验优化

- 优化布局和信息呈现，涉及HOME 目录以 ~ 缩写表示、输入框窄屏布局、反馈界面等
- 优化界面操作，涉及侧栏搜索焦点响应、工作流面板操作、模型选择器选中操作、打开本地文件失败支持重试等
- 优化工具调用，web_search 支持并发查询、子代理 reportDelivery 会及时反馈并唤醒父任务
- 优化安装与启动，改善下载依赖体积、本地运行 dsh web 时会自动打开浏览器
- 改善大历史会话执行分叉操作上的性能耗时

#### 其他变更

- 改善 SQLite 后端的读写与分叉性能并降低存储体积，数据结构不兼容
- 明确品牌使用规范：“DeepSeek Harness”是注册商标，详见 品牌使用规范

#### SDK

- Python SDK 依赖配置覆盖 4 个内置 Agent 预设，并包含 rg / glob 搜索和 MCP stdio 工具所需依赖

## 2026/08/17

### DeepSeek Harness 0.1.0-rc.7 发布

#### 新增功能

- 各插件可自行注册设置卡片
- Codex 与 Claude Code 子代理任务接入 Job Panel
- MCP/ACP 支持持久化图片附件，PTC Mode 可转发嵌套图片

#### 问题修复

- 修复极简模式下持久 Bash 调用卡顿
- 修复大历史消息分页栈溢出
- 修复 max-tokens 截断导致会话无法继续
- 修复 Safari 输入框光标与文本错位
- 升级 node-pty 1.2 beta，改善 PTY 平台兼容性

#### 体验优化

- 优化 Cordis 动态插件面板
- DeepSeek 模型新增 low 推理强度，默认仍为 high
- 英文内置预设 Code mode 更名为 PTC mode
- 提问卡片支持折叠并保留草稿

## 2026/08/13

### DeepSeek Harness 正式发布
