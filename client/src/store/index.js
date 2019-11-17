import Vue from 'vue'
import Vuex from 'vuex'
import chat from './chat';
import wsPlugin from "./plugins/ws";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat
  },
  plugins: [
      wsPlugin()
  ]
})
