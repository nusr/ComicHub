import { postItem } from '../services';

export default {
    namespace: 'common',
    state: {
        list: [],
    },
    effects: {
        * fetch({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
            const response = yield call(postItem, payload);
            yield put({
                payload: response,
                type: 'saveData',
            });
        },
    },
    reducers: {
        saveData(state: {
            list: any[];
        }, { payload }: { payload: any }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};
