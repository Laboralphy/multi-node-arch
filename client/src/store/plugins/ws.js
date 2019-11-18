import * as CHAT_ACTIONS from '../chat/action_types';
import * as CHAT_MUTATIONS from '../chat/action_types';
import * as NET_ACTIONS from '../net/action-types';
import * as NET_MUTATIONS from '../net/mutation-types';
import WsConnector from "../../libs/ws-connector";


export default function ws() {
    const NS_NET = 'net/';
    const NS_CHAT = 'chat/';
    return store => {
        const wsc = new WsConnector();
        wsc.connect();
        wsc.socket.on('sc-chat-message', ({name, content}) => {
            console.log('received from server', name, content);
            store.commit(
                NS_CHAT + CHAT_MUTATIONS.POST_MESSAGE,
                {name, content}
            );
        });
        store.subscribeAction((action, state) => {
            switch (action.type) {
                case NS_NET + NET_ACTIONS.CONNECT:
                    wsc.connect().then(value => {
                        store.commit(NS_NET + NET_MUTATIONS.SET_CONNECTED, {value});
                    }).catch(e => {
                        store.commit(NS_NET + NET_MUTATIONS.SET_ERROR_MESSAGE, {value: e});
                    });
                    break;

                case NS_NET + NET_ACTIONS.SEND_MESSAGE:
                    wsc.socket.emit('cs-chat-message', action.payload);
                    break;
            }
        });
    };
}
