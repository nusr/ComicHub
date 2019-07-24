import configData from '../shared';
import zhCN from './zh-CN';
import enUS from './en-US';

type LanguageMap = {
  [key: string]: JsObject;
};
const languageMap: LanguageMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export function getLanguageData(
  id: string,
  language: string = configData.language
): string {
  const data: JsObject = languageMap[language];
  if (data && data[id]) {
    return data[id];
  }
  return '';
}
