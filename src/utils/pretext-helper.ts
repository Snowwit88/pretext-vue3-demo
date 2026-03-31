import { prepare, layout, prepareWithSegments, layoutWithLines, walkLineRanges } from '@chenglou/pretext'

export class PretextHelper {
  /**
   * 测量文本高度（基础用法）
   */
  static measureTextHeight(
    text: string,
    font: string,
    maxWidth: number,
    lineHeight: number,
    options?: { whiteSpace?: 'normal' | 'pre-wrap' }
  ) {
    const prepared = prepare(text, font, options)
    return layout(prepared, maxWidth, lineHeight)
  }
  
  /**
   * 获取文本行（高级用法）
   */
  static getTextLines(
    text: string,
    font: string,
    maxWidth: number,
    lineHeight: number
  ) {
    const prepared = prepareWithSegments(text, font)
    const result = layoutWithLines(prepared, maxWidth, lineHeight)
    return result.lines
  }
  
  /**
   * 计算最窄宽度（文本收缩包装）
   */
  static calculateMinWidth(
    text: string,
    font: string,
    maxWidth: number
  ): number {
    const prepared = prepareWithSegments(text, font)
    let minWidth = 0
    
    walkLineRanges(prepared, maxWidth, line => {
      if (line.width > minWidth) {
        minWidth = line.width
      }
    })
    
    return minWidth
  }
  
  /**
   * 性能对比：Pretext vs 传统DOM测量
   */
  static performanceComparison(
    text: string,
    font: string,
    maxWidth: number,
    lineHeight: number,
    iterations: number = 1000
  ) {
    // Pretext 测量
    const pretextStart = performance.now()
    const prepared = prepare(text, font)
    
    for (let i = 0; i < iterations; i++) {
      layout(prepared, maxWidth, lineHeight)
    }
    const pretextTime = performance.now() - pretextStart
    
    // 模拟传统DOM测量（实际项目中会是真实的DOM操作）
    const domStart = performance.now()
    for (let i = 0; i; i++) {
      // 模拟昂贵的DOM操作
      const element = document.createElement('div')
      element.style.font = font
      element.style.width = `${maxWidth}px`
      element.textContent = text
      document.body.appendChild(element)
      const height = element.offsetHeight
      document.body.removeChild(element)
    }
    const domTime = performance.now() - domStart
    
    return {
      pretextTime,
      domTime,
      speedup: domTime / pretextTime,
      iterations
    }
  }
  
  /**
   * 生成性能报告
   */
  static generatePerformanceReport() {
    const sampleText = '这是一个性能测试文本，用于展示Pretext的高性能特性。'.repeat(10)
    const font = '16px Inter'
    const maxWidth = 400
    const lineHeight = 24
    
    const result = this.performanceComparison(sampleText, font, maxWidth, lineHeight, 100)
    
    return {
      ...result,
      summary: `Pretext 比传统DOM测量快 ${result.speedup.toFixed(1)} 倍`
    }
  }
}