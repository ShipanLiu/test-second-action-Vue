// 所有的 import 都在这里， 因为这里是 main， 入口文件

import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

// .mount() 一定要在最后面
createApp(App)
.use(VueAxios, axios)
.mount('#app')
