import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

const Pagetransition = r => require.ensure([], () => r(require('../components/pagetransition.vue')), 'pagetransition')
const wake = r => require.ensure([], () => r(require('../components/wake/wake.vue')), 'wake')
const join = r => require.ensure([], () => r(require('../components/join/join.vue')), 'join')

export default new Router({
  // mode: 'history', 需要后台支持
  mode: 'hash',
  routes: [
    {
      path: '/',
      // name: 'pagetransition',
      component: Pagetransition,
      alias: 'wake', // alias: 让你可以自由地将UI结构映射到任意的URL，而不是受限于配置的嵌套路由结构
      children: [
        {
          path: '',
          name: 'wake',
          component: wake
        },
        {
          path: '/wake',
          name: 'wake',
          component: wake
        },
        {
          path: '/join',
          name: 'join',
          component: join
        }
      ]
    }
  ]
})

