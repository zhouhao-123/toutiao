import Vue from 'vue'
import Vuex from 'vuex'
import { setStorageItem,getStorageItem } from '../utils/storage.js'

Vue.use(Vuex)

const TOUTIAO_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // user: {}
    // 读取本地数据，转化为对象格式
    // 1. user: window.localStorage.getItem(TOUTIAO_KEY) ? JSON.parse(window.localStorage.getItem(TOUTIAO_KEY)) : {}
    user: getStorageItem(TOUTIAO_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 持久化保存数据,转化为字符串格式
      // 1. window.localStorage.setItem(TOUTIAO_KEY, JSON.stringify(state.user))
      setStorageItem(TOUTIAO_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
