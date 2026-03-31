import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

export const usePretextStore = defineStore('pretext', () => {
  // 状态
  const textContent = ref('Vue 3 + Pretext 演示项目\n这是一个高性能文本布局引擎的演示。\n支持多行文本测量、实时布局计算和零DOM读取。')
  const fontSize = ref(16)
  const fontFamily = ref('Inter, system-ui, sans-serif')
  const containerWidth = ref(400)
  const lineHeight = ref(24)
  const whiteSpace = ref<'normal' | 'pre-wrap'>('normal')
  
  // 计算字体字符串
  const fontString = computed(() => `${fontSize.value}px ${fontFamily.value}`)
  
  // 准备文本（一次性操作）
  const preparedText = computed(() => {
    return prepare(textContent.value, fontString.value, { whiteSpace: whiteSpace.value })
  })
  
  // 准备带分段的文本（用于行级操作）
  const preparedTextWithSegments = computed(() => {
    return prepareWithSegments(textContent.value, fontString.value)
  })
  
  // 计算布局
  const textLayout = computed(() => {
    return layout(preparedText.value, containerWidth.value, lineHeight.value)
  })
  
  // 获取所有行
  const textLines = computed(() => {
    const result = layoutWithLines(preparedTextWithSegments.value, containerWidth.value, lineHeight.value)
    return result.lines
  })
  
  // 性能统计
  const performanceStats = ref({
    prepareTime: 0,
    layoutTime: 0,
    domMeasurements: 0
  })
  
  // 操作方法
  const updateText = (newText: string) => {
    const startTime = performance.now()
    textContent.value = newText
    performanceStats.value.prepareTime = performance.now() - startTime
  }
  
  const updateContainerWidth = (width: number) => {
    const startTime = performance.now()
    containerWidth.value = width
    performanceStats.value.layoutTime = performance.now() - startTime
  }
  
  const updateFontSize = (size: number) => {
    fontSize.value = size
  }
  
  const toggleWhiteSpace = () => {
    whiteSpace.value = whiteSpace.value === 'normal' ? 'pre-wrap' : 'normal'
  }
  
  // 模拟传统DOM测量（用于对比）
  const simulateDomMeasurement = () => {
    performanceStats.value.domMeasurements++
    return {
      height: Math.random() * 100 + 100, // 模拟不准确的测量
      lineCount: Math.floor(Math.random() * 10) + 1
    }
  }
  
  return {
    // 状态
    textContent,
    fontSize,
    fontFamily,
    containerWidth,
    lineHeight,
    whiteSpace,
    
    // 计算属性
    fontString,
    preparedText,
    preparedTextWithSegments,
    textLayout,
    textLines,
    performanceStats,
    
    // 方法
    updateText,
    updateContainerWidth,
    updateFontSize,
    toggleWhiteSpace,
    simulateDomMeasurement
  }
})