// Enabled 为 true 表示功能完成
import { UrlConfigItem } from './type';

type ConfigType = {
  [key: string]: UrlConfigItem;
};
const configData: ConfigType = {
  manhuagui: {
    base: 'https://www.manhuagui.com',
    enabled: true,
    name: '看漫画',
  },
  tohomh123: {
    base: 'https://www.tohomh123.com',
    enabled: true,
    name: '土豪漫画',
  },
  u17: {
    base: 'http://www.u17.com',
    enabled: true,
    name: '有妖气漫画',
  },
  qq: {
    base: 'https://ac.qq.com',
    name: '腾讯动漫',
    enabled: false,
  },
};
export default configData;
