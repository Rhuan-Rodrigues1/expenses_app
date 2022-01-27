import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'home',
      title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */'../views/home/Home')
  },
  {
    path: '/lista-gastos',
    name: 'lista-gastos',
    meta: {
      icon: 'list-ul',
      title: 'Lista Gastos'
    },
    component: () => import(/* webpackChunkName: "lista-gastos" */'../views/expenses-list/ExpensesList')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      icon: 'Home',
      title: 'Login'
    },
    component: () => import(/* webpackChunkName: "login" */'../views/login/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Expenses`

  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
