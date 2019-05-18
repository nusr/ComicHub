import { Card, Button, message } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
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
        searchData = [],
        chapterData,
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
    let columns = [];
    if (currentType === typeConfig.search) {
        columns = searchColumns;
        dataSource = searchData;
    }
    if (currentType === typeConfig.chapter) {
        columns = chapterColumns;
        dataSource = chapterData;
    }

    function handleFormSubmit(value: IFormData) {
        console.log(value);
        if (value.name && value.url) {
            setCurrentUrl(value.url);
            dispatch({
                type: 'search/fetch',
                payload: {
                    ...value,
                    type: typeConfig.search,
                },
            });
        }
    }

    function handleSelectRows(value) {
        console.log(value);
        setSelectedRows(value);
    }

    function handleCheckSubmit() {
        if (currentType === typeConfig.search) {
            if (!selectedRows || selectedRows.length === 0) {
                message.error(`请选择漫画！`);
                return;
            }
            const item = selectedRows[0];
            setCurrentType(typeConfig.chapter);
            dispatch({
                type: 'chapter/fetch',
                payload: {
                    url: currentUrl,
                    name: item.url,
                    type: typeConfig.chapter,
                },
            });
        }
        if (currentType === typeConfig.chapter) {
            if (!selectedRows || selectedRows.length === 0) {
                message.error(`请选择章节！`);
                return;
            }
            const item = selectedRows[0];
            setCurrentType(typeConfig.download);
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
    }

    return (
        <div className={styles.mainLayout}>
            <Card className={styles.header}>
                <SearchForm menuList={menuList} handleFormSubmit={handleFormSubmit} />
            </Card>
            <Card className={styles.content} bordered={false}>
                <div className={styles.submit}>
                    <Button type="primary" onClick={handleCheckSubmit}>
            提交
                    </Button>
                </div>
                <DumpTable
                    loading={loading}
                    checkType={checkType}
                    selectedRows={selectedRows}
                    data={dataSource}
                    columns={columns}
                    onSelectRow={handleSelectRows}
                />
            </Card>
            <div className={styles.footer}>
                <CommonFooter />
            </div>
        </div>
    );
}

export default connect(({ menu, loading, search, chapter }) => ({
    menuData: menu.list,
    loading: loading.models.download,
    searchData: search.list,
    chapterData: chapter.list,
}))(HomePage);
