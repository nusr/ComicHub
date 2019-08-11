import zhCN from './zh-CN';
import enUS from './en-US';

const languageMap: any = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export function getLanguageData(
  id: string,
  language: string = 'zh-CN') {
  const data = languageMap[language];
  if (data && data[id]) {
    return data[id];
  }
  return '';
}

export function getLocale() {
  return 'zh-CN';
}

export function setLocale(value: string) {
  return value;
}
