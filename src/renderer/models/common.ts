import { postItem } from '../services';

export default {
    namespace: 'common',
    state: {
        list: [],
    },
    effects: {
        * fetch({ payload }, { call, put }) {
            const response = yield call(postItem, payload);
            yield put({
                payload: response,
                type: 'saveData',
            });
        },
    },
    reducers: {
        saveData(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};
