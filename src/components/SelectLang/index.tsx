import React from 'react';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-locale';
import { Dropdown, Icon, Menu } from 'antd';
import styles from './index.less';

type ObjectType = {
    [key: string]: string;
}
type Event = {
    key: string;
}
const SelectLang: React.FunctionComponent = () => {
    function changeLang(event: Event) {
        const { key } = event;
        setLocale(key);
    }


    const selectedLang = getLocale();
    const locales: string[] = ['zh-CN', 'en-US'];
    const languageLabels: ObjectType = {
        'zh-CN': '中文',
        'en-US': 'English',
    };
    const title: string = formatMessage({ id: 'component.SelectLang.language' });
    const languageIcons: ObjectType = {
        'zh-CN': '🇨🇳',
        'en-US': '🇬🇧',
    };
    const langMenu = (
        <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
            {locales.map(locale => (
                <Menu.Item key={locale}>
                    <span role="img" aria-label={languageLabels[locale]}>
                        {languageIcons[locale]}
                    </span>
                    {languageLabels[locale]}
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <Dropdown overlay={langMenu} placement="bottomRight">
            <Icon type="global" title={title} className={styles.icon} />
        </Dropdown>
    );
};

export default SelectLang;
