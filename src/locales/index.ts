import zhCN from './zh-CN';
import enUS from './en-US';

const LANGUAGE_KEY = 'comic-hub-language';
// eslint-disable-next-line
const languageMap: { [key: string]: any } = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export function getLocale(): string {
  return process.env.LANGUAGE || localStorage.getItem(LANGUAGE_KEY) || 'zh-CN';
}

export function setLocale(value: string) {
  localStorage.setItem(LANGUAGE_KEY, value);
}

export function getLanguageData(id: string): string {
  const language = getLocale();
  const data = languageMap[language];
  if (data && data[id]) {
    return data[id];
  }
  return '';
}
