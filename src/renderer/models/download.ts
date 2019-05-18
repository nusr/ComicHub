import { postItem } from '../services';
import { message } from 'antd';

export default {
    namespace: 'download',
    state: {
        result: false,
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(postItem, payload);
            if (response && response.code === 200) {
                message.error(`下载成功！`);
            }
        },
    },
};
