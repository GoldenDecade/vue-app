/**
 * Created by lenovo on 2017/12/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

export default new Vuex.Store({
  state, actions, mutations
})
