import routes from './routes';
import plugins from './plugins';

export default {
    history: 'hash',
    outputPath: 'dist/views',
    plugins,
    proxy: {
        '/v1': {
            changeOrigin: true,
            pathRewrite: { '^/v1': '' },
            target: 'http://localhost:1200',
        },
    },
    publicPath: './',
    routes,
    treeShaking: true,
    uglifyJSOptions: {
        uglifyOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                warnings: false,
            },
        },
    },
};
