import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Edit, Plus,Fold,Expand} from '@element-plus/icons-vue';
import "./assets/style/index.scss"
import App from './App.vue'
import Router from './router'
import Store from './store/index'

const app = createApp(App)
app.use(Router)
app.use(ElementPlus)
app.use(Store)
app.component('icon-edit', Edit);
app.component('icon-plus', Plus);
app.component('icon-fold', Fold);
app.component('icon-expand', Expand);
app.mount('#app')
