import * as MUTATIONS from './mutation-types';

let LAST_MESSAGE_ID = 10;

export default {
    [MUTATIONS.POST_MESSAGE]: (state, {name, content}) => {
        state.messages.push({name, content, id: ++LAST_MESSAGE_ID});
    }
};