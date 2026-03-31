<template>
  <div class="advanced-features card">
    <h2>🔧 高级功能</h2>
    
    <div class="features-intro">
      <p>Pretext 不仅提供基本的文本测量，还支持多种高级功能，满足复杂布局需求。</p>
    </div>
    
    <div class="features-grid">
      <!-- 多语言支持 -->
      <div class="feature-card">
        <div class="feature-icon">🌍</div>
        <div class="feature-content">
          <h3>多语言支持</h3>
          <p>支持所有语言，包括混合双向文本（RTL/LTR）、表情符号和特殊字符。</p>
          <div class="feature-demo">
            <div class="multilingual-text">
              <div class="text-example">Hello 你好 مرحبًا 🚀</div>
              <div class="text-example">混合文本: English 中文 العربية 🌟</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 行级控制 -->
      <div class="feature-card">
        <div class="feature-icon">📐</div>
        <div class="feature-content">
          <h3>行级控制</h3>
          <p>精确控制每一行的布局，支持自定义换行规则和行高。</p>
          <div class="feature-demo">
            <div class="line-control-demo">
              <div v-for="(line, index) in demoLines" :key="index" class="demo-line">
                <span class="line-number">{{ index + 1 }}</span>
                <span class="line-text">{{ line }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 收缩包装 -->
      <div class="feature-card">
        <div class="feature-icon">📦</div>
        <div class="feature-content">
          <h3>收缩包装</h3>
          <p>自动计算文本所需的最小宽度，实现完美的"收缩包装"效果。</p>
          <div class="feature-demo">
            <div class="shrink-wrap-demo">
              <div class="shrink-container" :style="shrinkContainerStyle">
                <div class="shrink-text">自适应宽度文本</div>
              </div>
              <div class="shrink-info">
                最小宽度: {{ minWidth }}px
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 服务器端渲染 -->
      <div class="feature-card">
        <div class="feature-icon">🖥️</div>
        <div class="feature-content">
          <h3>服务器端渲染</h3>
          <p>支持在服务器端进行文本测量，实现前后端一致的布局。</p>
          <div class="feature-demo">
            <div class="ssr-demo">
              <div class="ssr-badge">SSR Ready</div>
              <div class="ssr-desc">Node.js 环境可用</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 代码示例 -->
    <div class="code-examples">
      <h3>代码示例</h3>
      <div class="code-tabs">
        <div class="tab-buttons">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-button', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="tab-content">
          <pre v-if="activeTab === 'basic'"><code class="language-typescript">{{ basicExample }}</code></pre>
          <pre v-if="activeTab === 'advanced'"><code class="language-typescript">{{ advancedExample }}</code></pre>
          <pre v-if="activeTab === 'performance'"><code class="language-typescript">{{ performanceExample }}</code></pre>
        </div>
      </div>
    </div>
    
    <!-- 集成指南 -->
    <div class="integration-guide">
      <h3>集成指南</h3>
      <div class="guide-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>安装依赖</h4>
            <code>npm install @chenglou/pretext</code>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>基本使用</h4>
            <p>导入并测量文本高度</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>高级功能</h4>
            <p>使用行级控制、收缩包装等高级功能</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>性能优化</h4>
            <p>避免重复准备，缓存测量结果</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PretextHelper } from '@/utils/pretext-helper'

const demoLines = [
  '第一行：这是演示文本',
  '第二行：展示行级控制功能',
  '第三行：每行都可以独立处理',
  '第四行：支持自定义样式和布局'
]

const minWidth = ref(200)

const shrinkContainerStyle = computed(() => ({
  width: `${minWidth.value}px`,
  transition: 'width 0.3s ease'
}))

const tabs = [
  { id: 'basic', label: '基础用法' },
  { id: 'advanced', label: '高级功能' },
  { id: 'performance', label: '性能优化' }
]

const activeTab = ref('basic')

const basicExample = `import { prepare, layout } from '@chenglou/pretext'

// 准备文本（一次性操作）
const prepared = prepare('你的文本内容', '16px Inter')

// 计算布局（高频调用）
const { height, lineCount } = layout(prepared, containerWidth, lineHeight)

// 更新UI
element.style.height = \`\${height}px\``

const advancedExample = `import { prepareWithSegments, layoutWithLines, walkLineRanges } from '@chenglou/pretext'

// 获取所有行
const prepared = prepareWithSegments(text, font)
const { lines } = layoutWithLines(prepared, maxWidth, lineHeight)

// 逐行渲染
lines.forEach((line, index) => {
  ctx.fillText(line.text, 0, index * lineHeight)
})

// 计算最小宽度
let minWidth = 0
walkLineRanges(prepared, maxWidth, line => {
  if (line.width > minWidth) minWidth = line.width
})`

const performanceExample = `// 性能优化：缓存准备结果
const textCache = new Map()

function getPreparedText(text, font) {
  const key = \`\${text}|\${font}\`
  if (!textCache.has(key)) {
    textCache.set(key, prepare(text, font))
  }
  return textCache.get(key)
}

// 批量处理
const texts = ['文本1', '文本2', '文本3']
const preparedTexts = texts.map(text => prepare(text, font))

// 避免在循环中重复准备
for (const prepared of preparedTexts) {
  const layout = layout(prepared, width, lineHeight)
  // 使用布局结果
}`

// 模拟收缩包装动画
setInterval(() => {
  minWidth.value = minWidth.value === 200 ? 300 : 200
}, 2000)
</script>

<style scoped>
.advanced-features {
  padding: 1.5rem;
}

.features-intro {
  margin: 1rem 0 1.5rem;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 0.75rem;
  border-left: 4px solid var(--accent-color);
}

.features-intro p {
  margin: 0;
  color: var(--text-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  padding: 1.25rem;
  background: var(--bg-color);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.feature-content h3 {
  margin: 0 0 0.5rem;
  color: var(--text-color);
  font-size: 1.125rem;
}

.feature-content p {
  margin: 0 0 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

.feature-demo {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.multilingual-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}

.text-example {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: linear-gradient(90deg, rgba(79, 70, 229, 0.1), transparent);
  border-radius: 0.25rem;
}

.text-example:last-child {
  margin-bottom: 0;
}

.line-control-demo {
  font-family: 'SF Mono', monospace;
  font-size: 0.75rem;
}

.demo-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.demo-line:last-child {
  border-bottom: none;
}

.line-number {
  color: var(--primary-color);
  font-weight: 600;
  min-width: 1.5rem;
}

.line-text {
  color: var(--text-color);
  flex: 1;
}

.shrink-wrap-demo {
  text-align: center;
}

.shrink-container {
  margin: 0 auto;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--secondary-color), #34d399);
  color: white;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.shrink-text {
  font-weight: 600;
  font-size: 0.875rem;
}

.shrink-info {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: 'SF Mono', monospace;
}

.ssr-demo {
  text-align: center;
}

.ssr-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.ssr-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

.code-examples {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.code-tabs {
  background: var(--bg-color);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.tab-buttons {
  display: flex;
  background: white;
  border-bottom: 1px solid var(--border-color);
}

.tab-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  font-family: inherit;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.tab-button:hover {
  background: var(--bg-color);
  color: var(--text-color);
}

.tab-button.active {
  background: var(--primary-color);
  color: white;
}

.tab-content {
  padding: 1.5rem;
  overflow-x: auto;
}

.tab-content pre {
  margin: 0;
  font-family: 'SF Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-color);
}

.tab-content code {
  display: block;
  white-space: pre;
}

.integration-guide {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.guide-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  width: 2rem;
  height: 2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.5rem;
  color: var(--text-color);
  font-size: 1rem;
}

.step-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

.step-content code {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
  border-radius: 0.25rem;
  font-family: 'SF Mono', monospace;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.card {
  background: var(--card-bg);
  border-radius: 1rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .guide-steps {
    grid-template-columns: 1fr;
  }
  
  .tab-buttons {
    flex-direction: column;
  }
}
</style>