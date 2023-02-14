import {createRouter,createWebHashHistory} from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
router.beforeEach((to, from, next) => {
    NProgress.start()//加载进度条
    next()
})

//后置路由守卫
router.afterEach(() => {
    NProgress.done()
})

export default router