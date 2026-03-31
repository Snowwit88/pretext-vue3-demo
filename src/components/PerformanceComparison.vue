<template>
  <div class="performance-comparison card">
    <h2>⚡ 性能对比</h2>
    
    <div class="comparison-intro">
      <p>Pretext 通过避免昂贵的 DOM 测量操作（如 <code>getBoundingClientRect</code>、<code>offsetHeight</code>）来实现性能突破。以下是对比：</p>
    </div>
    
    <div class="comparison-grid">
      <!-- Pretext 优势 -->
      <div class="comparison-section pretext-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h3>Pretext 方式</h3>
        </div>
        <ul class="advantage-list">
          <li>
            <span class="advantage-icon">✅</span>
            <div class="advantage-content">
              <strong>零DOM读取</strong>
              <p>完全避免触发浏览器重排</p>
            </div>
          </li>
          <li>
            <span class="advantage-icon">⚡</span>
            <div class="advantage-content">
              <strong>纯算术计算</strong>
              <p>布局计算在 JavaScript 中完成</p>
            </div>
          </li>
          <li>
            <span class="advantage-icon">🎯</span>
            <div class="advantage-content">
              <strong>亚像素精度</strong>
              <p>精确的文本测量结果</p>
            </div>
          </li>
          <li>
            <span class="advantage-icon">🔄</span>
            <div class="advantage-content">
              <strong>实时更新</strong>
              <p>支持高频次布局更新</p>
            </div>
          </li>
        </ul>
        <div class="performance-metrics">
          <div class="metric">
            <div class="metric-label">典型性能</div>
            <div class="metric-value">0.1ms</div>
            <div class="metric-desc">每千次布局</div>
          </div>
          <div class="metric">
            <div class="metric-label">内存占用</div>
            <div class="metric-value">低</div>
            <div class="metric-desc">无额外DOM节点</div>
          </div>
        </div>
      </div>
      
      <!-- 传统DOM方式 -->
      <div class="comparison-section dom-section">
        <div class="section-header">
          <div class="section-icon">🐌</div>
          <h3>传统DOM方式</h3>
        </div>
        <ul class="disadvantage-list">
          <li>
            <span class="disadvantage-icon">❌</span>
            <div class="disadvantage-content">
              <strong>触发重排</strong>
              <p>每次测量都导致浏览器重新计算布局</p>
            </div>
          </li>
          <li>
            <span class="disadvantage-icon">⏱️</span>
            <div class="disadvantage-content">
              <strong>性能开销大</strong>
              <p>DOM操作是浏览器中最昂贵的操作之一</p>
            </div>
          </li>
          <li>
            <span class="disadvantage-icon">📏</span>
            <div class="disadvantage-content">
              <strong>精度问题</strong>
              <p>整数像素值，可能不准确</p>
            </div>
          </li>
          <li>
            <span class="disadvantage-icon">🚫</span>
            <div class="disadvantage-content">
              <strong>更新受限</strong>
              <p>高频更新会导致性能问题</p>
            </div>
          </li>
        </ul>
        <div class="performance-metrics">
          <div class="metric">
            <div class="metric-label">典型性能</div>
            <div class="metric-value">5-50ms</div>
            <div class="metric-desc">每次布局</div>
          </div>
          <div class="metric">
            <div class="metric-label">内存占用</div>
            <div class="metric-value">高</div>
            <div class="metric-desc">需要临时DOM节点</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 性能测试区域 -->
    <div class="performance-test">
      <h3>实时性能测试</h3>
      <div class="test-controls">
        <div class="test-input-group">
          <label for="iterations">测试迭代次数</label>
          <input
            id="iterations"
            type="range"
            v-model.number="iterations"
            min="100"
            max="10000"
            step="100"
          />
          <div class="input-value">{{ iterations.toLocaleString() }} 次</div>
        </div>
        <button class="btn btn-primary" @click="runPerformanceTest" :disabled="isTesting">
          {{ isTesting ? '测试中...' : '开始性能测试' }}
        </button>
      </div>
      
      <div v-if="testResult" class="test-result">
        <div class="result-header">
          <h4>测试结果</h4>
          <div class="speedup-badge" :class="speedupClass">
            {{ testResult.speedup.toFixed(1) }}倍
          </div>
        </div>
        <div class="result-details">
          <div class="result-chart">
            <div class="chart-bar pretext-bar" :style="pretextBarStyle">
              <span class="chart-label">Pretext</span>
              <span class="chart-value">{{ testResult.pretextTime.toFixed(2) }}ms</span>
            </div>
            <div class="chart-bar dom-bar" :style="domBarStyle">
              <span class="chart-label">DOM测量</span>
              <span class="chart-value">{{ testResult.domTime.toFixed(2) }}ms</span>
            </div>
          </div>
          <div class="result-summary">
            <p>Pretext 比传统DOM测量快 <strong>{{ testResult.speedup.toFixed(1) }}倍</strong></p>
            <p class="result-note">测试配置: {{ iterations }}次迭代，{{ testResult.iterations }}次布局计算</p>
          </div>
        </div>
      </div>
      
      <div v-else class="test-placeholder">
        <p>点击"开始性能测试"按钮查看 Pretext 的性能优势</p>
      </div>
    </div>
    
    <!-- 应用场景 -->
    <div class="use-cases">
      <h3>适用场景</h3>
      <div class="use-case-grid">
        <div class="use-case">
          <div class="use-case-icon">📊</div>
          <div class="use-case-content">
            <h4>数据可视化</h4>
            <p>实时更新的图表标签和文本标注</p>
          </div>
        </div>
        <div class="use-case">
          <div class="use-case-icon">💬</div>
          <div class="use-case-content">
            <h4>实时聊天</h4>
            <p>快速滚动的消息列表和虚拟滚动</p>
          </div>
        </div>
        <div class="use-case">
          <div class="use-case-icon">📝</div>
          <div class="use-case-content">
            <h4>文档编辑器</h4>
            <p>大型文档的流畅编辑和预览</p>
          </div>
        </div>
        <div class="use-case">
          <div class="use-case-icon">🎮</div>
          <div class="use-case-content">
            <h4>游戏UI</h4>
            <p>高频更新的游戏界面文本</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PretextHelper } from '@/utils/pretext-helper'

const iterations = ref(1000)
const testResult = ref<any>(null)
const isTesting = ref(false)

const pretextBarStyle = computed(() => {
  if (!testResult.value) return { width: '0%' }
  const maxTime = Math.max(testResult.value.pretextTime, testResult.value.domTime)
  const width = (testResult.value.pretextTime / maxTime) * 100
  return { width: `${width}%` }
})

const domBarStyle = computed(() => {
  if (!testResult.value) return { width: '0%' }
  const maxTime = Math.max(testResult.value.pretextTime, testResult.value.domTime)
  const width = (testResult.value.domTime / maxTime) * 100
  return { width: `${width}%` }
})

const speedupClass = computed(() => {
  if (!testResult.value) return ''
  const speedup = testResult.value.speedup
  if (speedup > 100) return 'speedup-extreme'
  if (speedup > 50) return 'speedup-high'
  if (speedup > 10) return 'speedup-medium'
  return 'speedup-low'
})

const runPerformanceTest = async () => {
  isTesting.value = true
  testResult.value = null
  
  // 模拟测试延迟
  await new Promise(resolve => setTimeout(resolve, 100))
  
  try {
    const result = PretextHelper.performanceComparison(
      '性能测试文本 '.repeat(50),
      '16px Inter',
      400,
      24,
      iterations.value
    )
    
    testResult.value = result
  } catch (error) {
    console.error('性能测试失败:', error)
    alert('性能测试失败，请检查控制台')
  } finally {
    isTesting.value = false
  }
}
</script>

<style scoped>
.performance-comparison {
  padding: 1.5rem;
}

.comparison-intro {
  margin: 1rem 0 1.5rem;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 0.75rem;
  border-left: 4px solid var(--primary-color);
}

.comparison-intro p {
  margin: 0;
  color: var(--text-color);
}

.comparison-intro code {
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'SF Mono', monospace;
  font-size: 0.875em;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.comparison-section {
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
}

.pretext-section {
  border-color: var(--secondary-color);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), transparent);
}

.dom-section {
  border-color: #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.section-icon {
  font-size: 1.5rem;
}

.section-header h3 {
  font-size: 1.125rem;
  color: var(--text-color);
  margin: 0;
}

.advantage-list,
.disadvantage-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.advantage-list li,
.disadvantage-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.advantage-list li:last-child,
.disadvantage-list li:last-child {
  border-bottom: none;
}

.advantage-icon,
.disadvantage-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.advantage-content,
.disadvantage-content {
  flex: 1;
}

.advantage-content strong,
.disadvantage-content strong {
  display: block;
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 0.125rem;
}

.advantage-content p,
.disadvantage-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
}

.performance-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.metric {
  text-align: center;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.125rem;
}

.metric-desc {
  font-size: 0.75rem;
  color: #9ca3af;
}

.performance-test {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.test-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.test-input-group {
  flex: 1;
  min-width: 200px;
}

.test-input-group label {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.test-input-group input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--border-color);
  outline: none;
  -webkit-appearance: none;
}

.test-input-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: var(--shadow);
}

.input-value {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-color);
  font-weight: 600;
  margin-top: 0.5rem;
}

.test-result {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-header h4 {
  margin: 0;
  color: var(--text-color);
}

.speedup-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
}

.speedup-low { background: #10b981; }
.speedup-medium { background: #f59e0b; }
.speedup-high { background: #ef4444; }
.speedup-extreme { background: #8b5cf6; }

.result-details {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.result-chart {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chart-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: white;
  transition: width 0.5s ease-out;
  min-width: 60px;
}

.pretext-bar {
  background: linear-gradient(90deg, var(--secondary-color), #34d399);
}

.dom-bar {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.chart-label {
  font-weight: 600;
}

.chart-value {
  font-family: 'SF Mono', monospace;
  font-weight: 700;
}

.result-summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.result-summary p {
  margin: 0 0 0.5rem;
  color: var(--text-color);
}

.result-summary strong {
  color: var(--primary-color);
}

.result-note {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.test-placeholder {
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
  border: 2px dashed var(--border-color);
  border-radius: 0.75rem;
  margin-top: 1.5rem;
}

.use-cases {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.use-case {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  transition: transform 0.2s;
}

.use-case:hover {
  transform: translateY(-2px);
}

.use-case-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.use-case-content h4 {
  margin: 0 0 0.25rem;
  color: var(--text-color);
  font-size: 0.875rem;
  font-weight: 600;
}

.use-case-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.75rem;
  line-height: 1.4;
}

.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #4338ca;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.card {
  background: var(--card-bg);
  border-radius: 1rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .result-details {
    grid-template-columns: 1fr;
  }
  
  .test-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .use-case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
