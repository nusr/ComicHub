import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import SearchBox from '../../components/SearchBox';
import SearchResult from '../../components/SearchResult';
import Notification from '../../components/Notification';
import MenuTree from '../../components/MenuTree';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

export default function HomePage() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    const containerClass = collapsed ? styles.collapsed : '';
    return (
        <div className={containerClass}>
            <div className={styles.sider}>
                <MenuTree />
            </div>
            <Layout className={styles.mainLayout}>
                <Header className={styles.header}>
                    <Icon
                        className={styles.trigger}
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggleMenu}
                    />
                    <SearchBox />
                </Header>
                <Content className={styles.content}>
                    <SearchResult />
                </Content>
                <Footer className={styles.footer}>
                    <Notification />
                </Footer>
            </Layout>
        </div>
    );
}
