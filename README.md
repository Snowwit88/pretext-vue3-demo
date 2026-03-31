# Pretext + Vue 3 演示项目

一个展示Pretext高性能文本布局引擎的Vue 3演示项目。

## 🚀 功能特性

### 📊 实时文本测量
- 文本内容、字体大小、容器宽度实时调整
- Pretext vs 传统DOM测量对比
- 零DOM读取的性能优势展示

### ⚡ 性能对比可视化
- 实时性能测试（可自定义迭代次数）
- 图表展示1200倍性能提升
- 适用场景分析

### 🔧 高级功能演示
- 多语言支持（混合文本、表情符号）
- 行级控制（精确控制每一行）
- 收缩包装（自动计算最小宽度）
- 服务器端渲染支持

### 🎨 交互式学习体验
- 所有参数可实时调整
- 代码示例和集成指南
- 完整的文档说明

## 🛠️ 技术栈

- **Vue 3**: 选项式API
- **TypeScript**: 类型安全
- **Pinia**: 状态管理
- **Vite**: 构建工具
- **@chenglou/pretext**: 高性能文本布局引擎

## 📦 安装与运行

### 1. 克隆项目
```bash
git clone https://github.com/[你的用户名]/pretext-vue3-demo.git
cd pretext-vue3-demo
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问应用
打开浏览器访问：`http://localhost:3000`

## 🏗️ 项目结构

```
pretext-vue3-demo/
├── src/
│   ├── main.ts              # 应用入口
│   ├── App.vue              # 主应用组件
│   ├── stores/
│   │   └── pretext.ts       # Pinia状态管理
│   ├── utils/
│   │   └── pretext-helper.ts # Pretext工具类
│   └── components/
│       ├── ControlPanel.vue        # 控制面板
│       ├── TextDisplay.vue         # 文本显示
│       ├── PerformanceComparison.vue # 性能对比
│       └── AdvancedFeatures.vue    # 高级功能
├── package.json            # 项目配置
├── vite.config.js         # Vite配置
├── tsconfig.json         # TypeScript配置
└── README.md             # 项目说明
```

## 🎯 Pretext技术优势

### 性能突破
- **传统DOM测量**: 5-50ms/每次布局，触发浏览器重排
- **Pretext方案**: 0.1ms/千次布局，零DOM读取
- **性能提升**: 1200倍

### 技术原理
1. **prepare()**: 一次性文本准备操作
2. **layout()**: 高频布局计算，避免DOM操作
3. **零DOM读取**: 完全避免浏览器重排

### 适用场景
- 数据可视化（实时更新的图表标签）
- 实时聊天（快速滚动的消息列表）
- 文档编辑器（大型文档的流畅编辑）
- 游戏UI（高频更新的游戏界面文本）

## 📱 响应式设计

- 完美适配移动端和桌面端
- 现代化的UI设计
- 完整的CSS变量系统
- 交互式图表和动画

## 🔧 构建与部署

### 开发模式
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📚 学习资源

- [Pretext GitHub仓库](https://github.com/chenglou/pretext)
- [Pretext官方演示](https://chenglou.me/pretext/)
- [Vue 3官方文档](https://vuejs.org/)
- [Pinia官方文档](https://pinia.vuejs.org/)

## 🤝 贡献指南

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [chenglou/pretext](https://github.com/chenglou/pretext) - 优秀的文本布局引擎
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端工具

---

**立即体验Pretext的强大功能！** 🚀