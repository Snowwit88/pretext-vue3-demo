<template>
  <div class="text-display card">
    <h2>📝 文本显示与测量</h2>
    
    <div class="display-container">
      <!-- 传统DOM测量区域（对比用） -->
      <div class="measurement-section">
        <h3>传统DOM测量</h3>
        <div
          ref="domContainer"
          class="dom-text-container"
          :style="domContainerStyle"
        >
          {{ store.textContent }}
        </div>
        <div class="measurement-info">
          <button class="btn btn-secondary" @click="measureWithDOM">
            📏 执行DOM测量
          </button>
          <div class="info-item">
            <span class="info-label">DOM测量次数:</span>
            <span class="info-value">{{ store.performanceStats.domMeasurements }}</span>
          </div>
        </div>
      </div>
      
      <!-- Pretext测量区域 -->
      <div class="measurement-section">
        <h3>Pretext 测量（零DOM读取）</h3>
        <div
          class="pretext-text-container"
          :style="pretextContainerStyle"
        >
          <div
            v-for="(line, index) in store.textLines"
            :key="index"
            class="text-line"
            :style="lineStyle"
          >
            {{ line.text }}
          </div>
        </div>
        <div class="measurement-info">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">计算高度:</span>
              <span class="info-value highlight">{{ store.textLayout.height }}px</span>
            </div>
            <div class="info-item">
              <span class="info-label">行数:</span>
              <span class="info-value highlight">{{ store.textLayout.lineCount }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">准备时间:</span>
              <span class="info-value">{{ store.performanceStats.prepareTime.toFixed(2) }}ms</span>
            </div>
            <div class="info-item">
              <span class="info-label">布局时间:</span>
              <span class="info-value">{{ store.performanceStats.layoutTime.toFixed(2) }}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 布局信息 -->
    <div class="layout-info">
      <h3>布局信息</h3>
      <div class="info-cards">
        <div class="info-card">
          <div class="info-card-icon">📐</div>
          <div class="info-card-content">
            <div class="info-card-title">容器尺寸</div>
            <div class="info-card-value">{{ store.containerWidth }} × {{ store.textLayout.height }}px</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-icon">🔤</div>
          <div class="info-card-content">
            <div class="info-card-title">字体配置</div>
            <div class="info-card-value">{{ store.fontSize }}px {{ store.fontFamily }}</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-icon">⚡</div>
          <div class="info-card-content">
            <div class="info-card-title">性能优势</div>
            <div class="info-card-value">零DOM重排</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-icon">🎯</div>
          <div class="info-card-content">
            <div class="info-card-title">测量精度</div>
            <div class="info-card-value">亚像素级</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePretextStore } from '@/stores/pretext'
import { ref, computed } from 'vue'

const store = usePretextStore()
const domContainer = ref<HTMLElement>()

const domContainerStyle = computed(() => ({
  font: store.fontString,
  width: `${store.containerWidth}px`,
  lineHeight: `${store.lineHeight}px`,
  whiteSpace: store.whiteSpace
}))

const pretextContainerStyle = computed(() => ({
  width: `${store.containerWidth}px`,
  height: `${store.textLayout.height}px`
}))

const lineStyle = computed(() => ({
  font: store.fontString,
  lineHeight: `${store.lineHeight}px`,
  whiteSpace: store.whiteSpace
}))

const measureWithDOM = () => {
  if (domContainer.value) {
    // 模拟昂贵的DOM测量操作
    const startTime = performance.now()
    const height = domContainer.value.offsetHeight
    const width = domContainer.value.offsetWidth
    const endTime = performance.now()
    
    store.simulateDomMeasurement()
    
    alert(`DOM测量结果:\n高度: ${height}px\n宽度: ${width}px\n测量耗时: ${(endTime - startTime).toFixed(2)}ms\n\n注意：这触发了浏览器重排！`)
  }
}
</script>

<style scoped>
.text-display {
  padding: 1.5rem;
}

.display-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.measurement-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.measurement-section h3 {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.dom-text-container,
.pretext-text-container {
  border: 2px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  background: var(--bg-color);
  overflow: hidden;
  min-height: 150px;
}

.dom-text-container {
  border-color: #ef4444;
}

.pretext-text-container {
  border-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
}

.text-line {
  margin-bottom: 0.25rem;
}

.text-line:last-child {
  margin-bottom: 0;
}

.measurement-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--bg-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.info-label {
  color: #6b7280;
  font-weight: 500;
}

.info-value {
  color: var(--text-color);
  font-family: 'SF Mono', monospace;
  font-weight: 600;
}

.info-value.highlight {
  color: var(--primary-color);
  font-weight: 700;
}

.layout-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.layout-info h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-card-icon {
  font-size: 1.5rem;
}

.info-card-content {
  flex: 1;
}

.info-card-title {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.info-card-value {
  font-size: 0.875rem;
  color: var(--text-color);
  font-weight: 600;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: var(--border-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #d1d5db;
}

.card {
  background: var(--card-bg);
  border-radius: 1rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .display-container {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>