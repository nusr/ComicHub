import { Card, Button, message } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState, Fragment } from 'react';
import CommonFooter from '../../components/CommonFooter';
import SearchForm, { IFormData } from '../../components/SearchForm';
import { searchColumns, chapterColumns, typeConfig } from './columns';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';

function getMenuList(data = {}) {
    return Object.keys(data).map((key: string) => {
        const item = data[key];
        return {
            value: key,
            ...item,
        };
    });
}

function HomePage(props) {
    const {
        dispatch,
        menuData = [],
        loading,
        searchList = [],
        chapterList,
        downloadResult,
    } = props;
    const [currentType, setCurrentType] = useState(typeConfig.search);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentUrl, setCurrentUrl] = useState('');
    const menuList = getMenuList(menuData);
    let checkType = 'radio';
    let dataSource = [];
    useEffect(() => {
        dispatch({
            type: 'menu/fetch',
        });
    }, []);

    function handleSelectRows(value) {
        console.log(value);
        setSelectedRows(value);
    }

    function handleSearchSubmit(value: IFormData) {
        if (value.name && value.url) {
            setCurrentUrl(value.url);
            setCurrentType(typeConfig.search);
            dispatch({
                type: 'search/fetch',
                payload: {
                    ...value,
                    type: typeConfig.search,
                },
            });
        }
    }

    function handleChapterSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error(`请选择漫画！`);
            return;
        }
        const item = selectedRows[0];
        setCurrentType(typeConfig.chapter);
        setSelectedRows([]);
        dispatch({
            type: 'chapter/fetch',
            payload: {
                url: currentUrl,
                name: item.url,
                type: typeConfig.chapter,
            },
        });
    }

    function handleDownloadSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error(`请选择章节！`);
            return;
        }
        const item = selectedRows[0];
        setCurrentType(typeConfig.download);
        setSelectedRows([]);
        dispatch({
            type: 'download/fetch',
            payload: {
                url: currentUrl,
                name: item.url,
                type: typeConfig.download,
                page_size: item.page_size,
            },
        });
    }

    const getCurrentChild = () => {
        if (currentType === typeConfig.search) {
            return (
                <Fragment>
                    <div className={styles.submit}>
                        <Button type="primary" onClick={handleChapterSubmit}>
                            提交
                        </Button>
                    </div>
                    <DumpTable
                        loading={loading}
                        checkType={checkType}
                        selectedRows={selectedRows}
                        data={searchList}
                        columns={searchColumns}
                        onSelectRow={handleSelectRows}
                    />
                </Fragment>
            );
        }
        if (currentType === typeConfig.chapter) {
            return (
                <Fragment>
                    <div className={styles.submit}>
                        <Button type="primary" onClick={handleDownloadSubmit}>
                            提交
                        </Button>
                    </div>
                    <DumpTable
                        loading={loading}
                        checkType={checkType}
                        selectedRows={selectedRows}
                        data={chapterList}
                        columns={chapterColumns}
                        onSelectRow={handleSelectRows}
                    />
                </Fragment>
            );
        }
        if (currentType === typeConfig.download) {
            return <div>{downloadResult ? '下载中。。。' : '下载成功'}</div>;
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
            <Card className={styles.content} bordered={false}>
                {getCurrentChild()}
            </Card>
            <div className={styles.footer}>
                <CommonFooter />
            </div>
        </div>
    );
}

export default connect(({ menu, loading, search, chapter, download }) => ({
    menuData: menu.list,
    loading: loading.models.download,
    searchList: search.list,
    chapterList: chapter.list,
    downloadResult: download.result,
}))(HomePage);
