import { createStore } from 'vuex'

export default createStore({
  state: {
    city: 1,
  },
  mutations: {
    increment(state) {
      state.city++
    },
    setPrint(state, step) { //设置参数
      state.city = step;
    }
  },
  getters: {
    optCount: function (state) {
      return state.city
    }
  },
  actions: {
  },
  modules: {
  }
})
