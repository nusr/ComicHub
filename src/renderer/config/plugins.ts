import os from 'os';

export default [
    [
        'umi-plugin-react',
        {
            antd: true,
            dll: true,
            dva: true,
            dynamicImport: true,
            routes: {
                exclude: [/components/],
            },
            title: 'Comic Downloader',
        },
    ],
];
