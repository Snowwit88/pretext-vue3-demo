import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 创建应用
const app = createApp(App)

// 使用 Pinia
const pinia = createPinia()
app.use(pinia)

// 挂载应用
app.mount('#app')

// 添加全局样式
const style = document.createElement('style')
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #app {
    min-height: 100vh;
  }
`
document.head.appendChild(style)