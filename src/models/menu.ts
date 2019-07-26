import { getMenuList } from '../services';

export default {
  namespace: 'menu',
  state: {
    list: [],
  },
  effects: {
    *fetch(
      { payload }: { payload: JsObject },
      { call, put }: { call: Function; put: Function }
    ) {
      const response = yield call(getMenuList, payload);
      yield put({
        payload: response,
        type: 'saveData',
      });
    },
  },
  reducers: {
    saveData(
      state: {
        list: any[];
      },
      { payload }: { payload: JsObject }
    ) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
