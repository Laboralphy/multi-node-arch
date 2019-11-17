import * as MUTATIONS from './mutation-types';

export default {
    [MUTATIONS.SET_CONNECTED]: (state, {value}) => {
        state.connected = value;
    },

    [MUTATIONS.SET_ERROR_MESSAGE]: (state, {value}) => {
        state.error = value;
    }
};