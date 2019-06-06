export default [
    [
        'umi-plugin-react',
        {
            antd: true,
            dll: true,
            dva: {
                hmr: true,
            },
            locale: {
                // Default false
                enable: true,
                // Default zh-CN
                default: 'zh-CN',
                // Default true, when it is true, will use `navigator.language` overwrite default
                baseNavigator: true,
            },
            dynamicImport: true,
            routes: {
                exclude: [/components/],
            },
            title: 'Comic Downloader',
        },
    ],
];
