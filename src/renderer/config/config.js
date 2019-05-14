import routes from './routes';
import plugins from './plugins';

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
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
};
