import { postItem } from '../services';
import { message } from 'antd';

export default {
    namespace: 'download',
    state: {
        result: false,
    },
    effects: {
        * fetch({ payload }, { call, put }) {
            const response: any = yield call(postItem, payload);
            const checkCode: boolean = response && response.code === 200;
            yield put({
                payload: checkCode,
                type: 'saveResult',
            });
        },
    },
    reducers: {
        saveResult(state, { payload }) {
            return {
                ...state,
                result: payload,
            };
        },
    },
};
