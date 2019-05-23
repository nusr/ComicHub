export default {
    namespace: 'shared',
    state: {
        currentUrl: '',
        currentType: '',
    },
    reducers: {
        changeUrl(state, { payload }) {
            return {
                ...state,
                currentUrl: payload,
            };
        },
        changeType(state, { payload }) {
            return {
                ...state,
                currentType: payload,
            };
        },
    },
};
