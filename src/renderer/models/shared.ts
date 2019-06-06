import { SharedState } from '../type';

export default {
    namespace: 'shared',
    state: {
        currentUrl: '',
        currentType: '',
    },
    reducers: {
        changeUrl(state: SharedState, { payload }: { payload: string }) {
            return {
                ...state,
                currentUrl: payload,
            };
        },
        changeType(state: SharedState, { payload }: { payload: string }) {
            return {
                ...state,
                currentType: payload,
            };
        },
    },
};
