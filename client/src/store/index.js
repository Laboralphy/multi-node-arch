import Vue from 'vue'
import Vuex from 'vuex'
import chat from './chat';
import net from './net';
import wsPlugin from "./plugins/ws";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        chat, net
    },
    plugins: [
        wsPlugin()
    ]
});
