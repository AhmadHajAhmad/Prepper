import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/global.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
