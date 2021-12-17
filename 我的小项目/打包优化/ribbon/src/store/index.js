import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pronum: {
      allNum: 0,
      activeNum: 0,
      onlineNum: 0
    },
    user: '',
    sideCollapsed: false,
    provider: '',
    netWork: true
  },
  mutations: {
    showequnum (state, msg) {
      state.pronum.allNum = msg[0];
      state.pronum.activeNum = msg[1];
      state.pronum.onlineNum = msg[2]
    },
    setuser (state, msg) {
      state.user = msg
    },
    openmenu (state, msg) {
      state.sideCollapsed = msg;
    },
    setprovider (state, msg) {
      state.provider = msg;
    },
    // 处理断网的情况
    changeNetWork (state, msg) {
      state.netWork = msg;
    }
  }
})

export default store
