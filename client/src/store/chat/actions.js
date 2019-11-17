import * as ACTIONS from './action_types';
import * as MUTATIONS from './mutation-types';

export default {
    [ACTIONS.POST_MESSAGE]: ({dispatch}, {name, content}) => {
        dispatch(MUTATIONS.POST_MESSAGE, {name, content});
    }
};