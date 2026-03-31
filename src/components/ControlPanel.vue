<template>
  <div class="control-panel card">
    <h2>📊 控制面板</h2>
    
    <div class="controls-grid">
      <!-- 文本输入 -->
      <div class="control-group">
        <label for="text-input">文本内容</label>
        <textarea
          id="text-input"
          v-model="store.textContent"
          @input="handleTextChange"
          rows="4"
          placeholder="输入文本内容..."
        ></textarea>
      </div>
      
      <!-- 字体大小控制 -->
      <div class="control-group">
        <label for="font-size">字体大小: {{ store.fontSize }}px</label>
        <input
          id="font-size"
          type="range"
          v-model.number="store.fontSize"
          min="12"
          max="48"
          step="1"
          @input="handleFontSizeChange"
        />
        <div class="range-values">
          <span>12px</span>
          <span>48px</span>
        </div>
      </div>
      
      <!-- 容器宽度控制 -->
      <div class="control-group">
        <label for="container-width">容器宽度: {{ store.containerWidth }}px</label>
        <input
          id="container-width"
          type="range"
          v-model.number="store.containerWidth"
          min="200"
          max="800"
          step="10"
          @input="handleWidthChange"
        />
        <div class="range-values">
          <span>200px</span>
          <span>800px</span>
        </div>
      </div>
      
      <!-- 行高控制 -->
      <div class="control-group">
        <label for="line-height">行高: {{ store.lineHeight }}px</label>
        <input
          id="line-height"
          type="range"
          v-model.number="store.lineHeight"
          min="16"
          max="48"
          step="2"
        />
        <div class="range-values">
          <span>16px</span>
          <span>48px</span>
        </div>
      </div>
      
      <!-- 切换按钮 -->
      <div class="control-group button-group">
        <button
          class="btn btn-secondary"
          @click="store.toggleWhiteSpace"
        >
          {{ store.whiteSpace === 'normal' ? '启用 pre-wrap' : '启用 normal' }}
        </button>
        <button
          class="btn btn-primary"
          @click="runPerformanceTest"
        >
          🚀 运行性能测试
        </button>
        <button
          class="btn btn-accent"
          @click="resetToDefaults"
        >
          🔄 重置默认值
        </button>
      </div>
    </div>
    
    <!-- 当前配置显示 -->
    <div class="current-config">
      <h3>当前配置</h3>
      <div class="config-grid">
        <div class="config-item">
          <span class="config-label">字体:</span>
          <span class="config-value">{{ store.fontString }}</span>
        </div>
        <div class="config-item">
          <span class="config-label">空白处理:</span>
          <span class="config-value">{{ store.whiteSpace }}</span>
        </div>
        <div class="config-item">
          <span class="config-label">文本长度:</span>
          <span class="config-value">{{ store.textContent.length }} 字符</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePretextStore } from '@/stores/pretext'
import { PretextHelper } from '@/utils/pretext-helper'

const store = usePretextStore()

const handleTextChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  store.updateText(target.value)
}

const handleFontSizeChange = () => {
  // 字体大小变化会自动触发计算属性更新
}

const handleWidthChange = () => {
  store.updateContainerWidth(store.containerWidth)
}

const runPerformanceTest = () => {
  const report = PretextHelper.generatePerformanceReport()
  alert(`性能测试结果:\n${report.summary}\n\nPretext: ${report.pretextTime.toFixed(2)}ms\nDOM测量: ${report.domTime.toFixed(2)}ms`)
}

const resetToDefaults = () => {
  store.textContent = 'Vue 3 + Pretext 演示项目\n这是一个高性能文本布局引擎的演示。\n支持多行文本测量、实时布局计算和零DOM读取。'
  store.fontSize = 16
  store.containerWidth = 400
  store.lineHeight = 24
  store.whiteSpace = 'normal'
}
</script>

<style scoped>
.control-panel {
  padding: 1.5rem;
}

.controls-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.875rem;
}

.control-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  resize: vertical;
  transition: border-color 0.2s;
}

.control-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.control-group input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--border-color);
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: var(--shadow);
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.button-group {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 120px;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--border-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-accent {
  background: var(--accent-color);
  color: white;
}

.btn-accent:hover {
  background: #d97706;
}

.current-config {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.current-config h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--bg-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.config-label {
  color: #6b7280;
  font-weight: 500;
}

.config-value {
  color: var(--text-color);
  font-family: 'SF Mono', monospace;
  font-weight: 600;
}

.card {
  background: var(--card-bg);
  border-radius: 1rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .config-grid {
    grid-template-columns: 1fr;
  }
}
</style>