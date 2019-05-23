import { Button, message } from 'antd';
import { connect } from 'dva';
import React, { useState, Fragment } from 'react';
import { searchColumns, typeConfig } from './columns';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';

function SearchResult(props) {
    const { dispatch, loading, searchList = [], currentUrl } = props;
    const [selectedRows, setSelectedRows] = useState([]);
    let checkType = 'radio';

    function handleSelectRows(value) {
        console.log(value);
        setSelectedRows(value);
    }

    function handleChapterSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error(`请选择漫画！`);
            return;
        }
        const item = selectedRows[0];
        setSelectedRows([]);
        dispatch({
            type: 'shared/changeType',
            payload: typeConfig.chapter,
        });
        dispatch({
            type: 'chapter/fetch',
            payload: {
                url: currentUrl,
                name: item.url,
                type: typeConfig.chapter,
            },
        });
    }

    return (
        <Fragment>
            <div className={styles.submit}>
                <Button
                    type="primary"
                    onClick={handleChapterSubmit}
                    disabled={selectedRows.length === 0}
                >
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

export default connect(({ loading, search, shared }) => ({
    loading: loading.models.search,
    searchList: search.list,
    currentUrl: shared.currentUrl,
}))(SearchResult);
