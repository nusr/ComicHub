import _ from 'lodash';
import config from '../shared';
import zhCN from './zh-CN';
import enUS from './en-US';
import { IObject } from '../type';

type LanguageMap = {
    [key: string]: IObject
}
const languageMap: LanguageMap = {
    'zh-CN': zhCN,
    'en-US': enUS,
};

export function getLanguageData(id: string): string {
    const { language } = config;
    return _.get(languageMap[language], id, '');
}
