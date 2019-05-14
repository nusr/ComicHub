import routes from './routes';
export default {
    history: 'hash',
    outputPath: `../../dist/renderer`,
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dll: true,
                dva: true,
                dynamicImport: true,
                hardSource: false,
                title: 'ComicHub',
                routes: {
                    exclude: [/components/],
                },
            },
        ],
    ],
    publicPath: './',
    routes,
};
