export default [
    [
        'umi-plugin-react',
        {
            antd: true,
            dva: true,
            dynamicImport: { webpackChunkName: true },
            locale: {
                enable: true,
                default: 'zh-CN',
                baseNavigator: true,
            },
            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
            title: 'Comic Downloader',
            dll: {
                include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'lodash'],
                exclude: ['@babel/runtime'],
            },
        },
    ],
];
