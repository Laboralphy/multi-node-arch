import WsConnector from "../../libs/ws-connector";
import * as ACTIONS from './action-types';
import * as MUTATIONS from './mutation-types';

const wsc = new WsConnector();

export default {
    [ACTIONS.SEND_MESSAGE]: ({dispatch}, payload) => {
        // nothing to do
    },

    [ACTIONS.CONNECT]: ({commit}, payload) => {
        // nothing to do
    }
}