import zhCN from './zh-CN';
import enUS from './en-US';

interface LanguageMap {
  [key: string]: any;
}

const languageMap: LanguageMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export function getLanguageData(
  id: string,
  language: string = 'zh-CN') {
  const data: any = languageMap[language];
  if (data && data[id]) {
    return data[id];
  }
  return '';
}

export function getLocale() {
  return 'zh-CN'
}

export function setLocale(value: string) {
  return value;
}
