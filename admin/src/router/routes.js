import Main from '../Layout/Main.vue'
/**
* router自定义配置项
* hidden: true                   如果设置true则左侧路由菜单隐藏
* name:'router-name'             <keep-alive>使用必须设置
* meta : {
   title: 'title'                当前路由的中文名称
   icon: 'icon-edit'             main.js手动引入的图标 才可用
 }
**/
const routes = [
  {
    path: '',
    component: Main,
    redirect: 'home',
    meta: { title: '首页' },
    children: [{
      path: 'home',
      component: () => import('../views/home.vue'),
      name: 'home',
      meta: { title: '首页', icon: 'icon-edit' }
    },
    ]
  },
  {
    path: '/set',
    component: Main,
    meta: { title: '设置', icon: 'icon-edit' },
    children: [
      { path: 'list', component: () => import('../views/list.vue'), name: 'list', meta: { title: '列表', icon: 'icon-plus' } },
      { path: 'list2', component: () => import('../views/list2.vue'), name: 'list2', meta: { title: '列表2', icon: 'icon-plus' } }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/404.vue'), hidden: true },
]

export default routes
