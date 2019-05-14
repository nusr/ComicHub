import routes from './routes';
import plugins from './plugins';
export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  plugins,
  publicPath: './',
  routes,
};
