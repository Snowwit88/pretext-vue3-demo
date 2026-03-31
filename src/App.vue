<template>
  <div id="app">
    <header class="app-header">
      <h1>Pretext + Vue 3 演示</h1>
      <p class="subtitle">高性能文本布局引擎 | 零DOM读取 | 实时测量</p>
    </header>
    
    <main class="app-main">
      <div class="demo-container">
        <!-- 控制面板 -->
        <ControlPanel />
        
        <!-- 文本显示区域 -->
        <TextDisplay />
        
        <!-- 性能对比 -->
        <PerformanceComparison />
        
        <!-- 高级功能 -->
        <AdvancedFeatures />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>基于 @chenglou/pretext 构建 | Vue 3 选项式API | Pinia 状态管理</p>
      <p class="github-link">
        <a href="https://github.com/chenglou/pretext" target="_blank">查看 Pretext 源码</a> |
        <a href="https://chenglou.me/pretext/" target="_blank">查看官方演示</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './components/ControlPanel.vue'
import TextDisplay from './components/TextDisplay.vue'
import PerformanceComparison from './components/PerformanceComparison.vue'
import AdvancedFeatures from './components/AdvancedFeatures.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #4f46e5;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  --text-color: #1f2937;
  --bg-color: #f9fafb;
  --card-bg: #ffffff;
  --border-color: #e5e7eb;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-color);
  background: var(--bg-color);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, var(--primary-color), #7c3aed);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.app-header .subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.app-main {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.demo-container {
  display: grid;
  gap: 2rem;
}

.app-footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 1rem;
  text-align: center;
  color: #6b7280;
}

.app-footer .github-link {
  margin-top: 0.5rem;
}

.app-footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.app-footer a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  .app-main {
    padding: 1rem;
  }
  
  .demo-container {
    gap: 1rem;
  }
}
</style>