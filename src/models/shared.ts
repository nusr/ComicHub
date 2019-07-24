import { SharedState } from '../type';

export default {
  namespace: 'shared',
  state: {
    currentUrl: '',
    currentType: '',
    params: {},
  },
  reducers: {
    changeUrl(state: SharedState, { payload }: { payload: string }) {
      return {
        ...state,
        currentUrl: payload,
      };
    },
    changeType(state: SharedState, { payload }: { payload: string }) {
      return {
        ...state,
        currentType: payload,
      };
    },
    changeParams(state: SharedState, { payload }: { payload: any }) {
      return {
        ...state,
        params: payload,
      };
    },
  },
};
