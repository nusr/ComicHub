import zhCN from './zh-CN';
import enUS from './en-US';
import config from '../shared';

interface LanguageMap {
  [key: string]: JsObject;
}

const languageMap: LanguageMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

function getLocale(): string {
  const lang: string = config && config.language;
  return lang || 'zh-CN';
}

export function getLanguageData(
  id: string) {
  const language: string = getLocale();
  const data: JsObject = languageMap[language];
  if (data && data[id]) {
    return data[id];
  }
  return '';
}
