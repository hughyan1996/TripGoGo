import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Detail from '../views/Detail.vue'

const routes = [
  {
    path: '',
    component: Main
  },
  {
    path: '/detail',
    component: Detail,
    name: 'detail'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
