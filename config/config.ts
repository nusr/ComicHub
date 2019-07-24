import routes from './routes';
import plugins from './plugins';

// const NODE_ENV: string = process.env.NODE_ENV as string;
export default {
  history: 'hash',
  // outputPath: 'server/dist/views',
  plugins,
  proxy: {
    '/v1': {
      changeOrigin: true,
      pathRewrite: { '^/v1': '' },
      target: 'http://localhost:1200',
    },
  },
  // publicPath: NODE_ENV === 'production' ? ' ' : './',
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
