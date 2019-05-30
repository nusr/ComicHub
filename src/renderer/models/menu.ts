import { getMenuList } from '../services';

export default {
    namespace: 'menu',
    state: {
        list: [],
    },
    effects: {
        * fetch({ payload }, { call, put }) {
            const response = yield call(getMenuList, payload);
            console.log(response);
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
