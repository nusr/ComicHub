import { Button, message } from 'antd';
import { connect } from 'dva';
import React, { useState, Fragment } from 'react';
import { chapterColumns, searchColumns, typeConfig } from './columns';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';

interface Props {
    dispatch: any;
    loading: boolean;
    chapterList: any;
    currentUrl: any;
}

function ChapterResult(props: Props) {
    const { dispatch, loading, chapterList = [], currentUrl } = props;
    const [selectedRows, setSelectedRows] = useState([]);
    let checkType = 'radio';

    function handleSelectRows(value) {
        console.log(value);
        setSelectedRows(value);
    }

    function handleChapterSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error(`请选择漫画章节！`);
            return;
        }
        const item = selectedRows[0];
        dispatch({
            type: 'shared/changeType',
            payload: typeConfig.download,
        });
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
                selectedRows={chapterColumns}
                data={chapterList}
                columns={searchColumns}
                onSelectRow={handleSelectRows}
            />
        </Fragment>
    );
}

export default connect(({ loading, chapter, shared }) => ({
    loading: loading.models.search,
    chapterList: chapter.list,
    currentUrl: shared.currentUrl,
}))(ChapterResult);
