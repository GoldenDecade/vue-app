import Vue from 'vue'
import Router from 'vue-router'
import state from '../store/state'
Router.prototype.goBack = function () {
  this.isBack = true;
  if(state.replacehistory){
    window.history.go(-1);
  }
  state.replacehistory = false;
  window.history.go(-1);
}

Vue.use(Router)

const Pagetransition = r => require.ensure([], () => r(require('../components/pagetransition.vue')), 'pagetransition')
const wake = r => require.ensure([], () => r(require('../components/wake/wake.vue')), 'wake')
const join = r => require.ensure([], () => r(require('../components/join/join.vue')), 'join')
const process = r => require.ensure([], () => r(require('../components/process/process.vue')), 'process')
const hotdot = r => require.ensure([], () => r(require('../components/hotdot/hotdot.vue')), 'hotdot')
const success = r => require.ensure([], () => r(require('../components/success/success.vue')), 'success')

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
          name: 'wake1',
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
        },
        {
          path: '/process',
          name: 'process',
          component: process
        },
        {
          path: '/hotdot',
          name: 'hotdot',
          component: hotdot
        },
        {
          path: '/success',
          name: 'success',
          component: success
        }
      ]
    }
  ]
})

