import configData from '../shared';
import zhCN from './zh-CN';
import enUS from './en-US';
import { IObject } from '../type';

type LanguageMap = {
  [key: string]: IObject;
};
const languageMap: LanguageMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export function getLanguageData(
  id: string,
  language: string = configData.language
): string {
  const data: IObject = languageMap[language];
  if (data && data[id]) {
    return data[id];
  }
  return '';
}
