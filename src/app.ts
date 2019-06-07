export const dva = {
    config: {
        onError(error: ErrorEvent) {
            error.preventDefault();
            console.error(error.message);
        },
    },
};
