import { Card, Steps } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import CommonFooter from '../../components/CommonFooter';
import SearchForm from '../../components/SearchForm';
import { typeConfig } from './columns';
import styles from './index.less';
import SearchResult from './SearchResult';
import ChapterResult from './ChapterResult';
import DownloadResult from './DownloadResult';
import { SharedState, MenuItem, IFormData } from '../../type';

const { Step } = Steps;

interface Props {
    dispatch: any;
    menuData: any;
    shared: SharedState;
}

function getMenuList(data = {}): MenuItem[] {
    return Object.keys(data).map((key: string) => {
        const item = data[key];
        return {
            value: key,
            ...item,
        };
    });
}

function getCurrentStep(type: string): number {
    switch (type) {
        case typeConfig.search:
            return 0;
        case typeConfig.chapter:
            return 1;
        case typeConfig.download:
            return 2;
        default:
            return 0;
    }
}

function HomePage(props: Props) {
    const {
        dispatch,
        menuData = {},
        shared: { currentType },
    } = props;
    const menuList: MenuItem[] = getMenuList(menuData);
    useEffect(() => {
        dispatch({
            type: 'menu/fetch',
        });
        dispatch({
            type: 'shared/changeType',
            payload: typeConfig.search,
        });
    }, []);

    function handleSearchSubmit(value: IFormData) {
        if (value.name && value.url) {
            dispatch({
                type: 'shared/changeUrl',
                payload: value.url,
            });
            dispatch({
                type: 'shared/changeType',
                payload: typeConfig.search,
            });
            dispatch({
                type: 'search/fetch',
                payload: {
                    ...value,
                    type: typeConfig.search,
                },
            });
        }
    }

    const getCurrentChild = () => {
        if (currentType === typeConfig.search) {
            return <SearchResult />;
        }
        if (currentType === typeConfig.chapter) {
            return <ChapterResult />;
        }
        if (currentType === typeConfig.download) {
            return <DownloadResult />;
        }
        return null;
    };
    return (
        <div className={styles.mainLayout}>
            <Card className={styles.header}>
                <SearchForm
                    menuList={menuList}
                    handleFormSubmit={handleSearchSubmit}
                />
            </Card>
            <Card bordered={false}>
                <Steps
                    className={styles.steps}
                    labelPlacement="vertical"
                    current={getCurrentStep(currentType)}
                >
                    <Step title="搜索漫画" />
                    <Step title="选择章节" />
                    <Step title="下载漫画" />
                </Steps>
            </Card>
            <Card className={styles.content} bordered={false}>
                {getCurrentChild()}
            </Card>
            <div className={styles.footer}>
                <CommonFooter />
            </div>
        </div>
    );
}

HomePage.defaultProps = {
    menuData: {},
    loading: false,
    shared: {},
};

export default connect(({ menu, loading, shared }) => ({
    menuData: menu.list,
    loading: loading.models.menu,
    shared,
}))(HomePage);
