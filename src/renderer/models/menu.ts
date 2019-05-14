import { getMenuList } from '../services/menu';

export default {
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getMenuList, payload);
      console.log(response);
      yield put({
        payload: response,
        type: 'saveDict',
      });
    },
  },
  namespace: 'menu',
  state: {
    list: [],
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
