import { postItem } from '../services';

export default {
  namespace: 'download',
  state: {
    result: false,
    downloadPath: '',
  },
  effects: {
    *fetch(
      { payload }: { payload: JsObject },
      { call, put }: { call: Function; put: Function }
    ) {
      const response: JsObject = yield call(postItem, payload);
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
    saveResult(state: { result: boolean }, { payload }: { payload: JsObject }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
