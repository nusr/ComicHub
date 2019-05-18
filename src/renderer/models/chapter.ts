import { postItem } from '../services';

export default {
    namespace: 'chapter',
    state: {
        list: [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(postItem, payload);
            yield put({
                payload: response,
                type: 'saveDict',
            });
        },
    },
    reducers: {
        saveDict(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};
