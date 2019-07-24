import { postItem } from '../services';

export default {
  namespace: 'download',
  state: {
    result: false,
    downloadPath: '',
  },
  effects: {
    *fetch(
      { payload }: { payload: any },
      { call, put }: { call: any; put: any }
    ) {
      const response: any = yield call(postItem, payload);
      const checkCode: boolean = response && response.code === 200;
      yield put({
        payload: {
          result: checkCode,
          downloadPath: response && response.data,
        },
        type: 'saveResult',
      });
    },
  },
  reducers: {
    saveResult(state: { result: boolean }, { payload }: { payload: any }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
