import Vue from 'vue'
import Vuex from 'vuex'
import { getLocal, setLocal } from '@/utils/storage.js'

Vue.use(Vuex)
const tokenKey = 'toutiao_token'
export default new Vuex.Store({
  state: {
    user: getLocal(tokenKey)
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      console.log(state)
      state.user = user
      setLocal(tokenKey, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
