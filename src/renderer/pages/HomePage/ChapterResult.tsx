import { Button, message } from 'antd';
import { connect } from 'dva';
import React, { Fragment, useState } from 'react';
import { renderDate, typeConfig } from './config';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';
import { IChapterItem } from '../../type/sql';
import { SharedState } from '../../type';

const chapterColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '章节名',
        dataIndex: 'title',
    },
    {
        title: '链接',
        dataIndex: 'url',
        render: (text: string) => (
            <a title={text} target="_blank" href={text}>
                {text}
            </a>
        ),
    },
    {
        title: '章节图片数量',
        dataIndex: 'page_size',
    },
    {
        title: '爬取时间',
        dataIndex: 'create_time',
        render: renderDate,
    },
];

type Props = {
    dispatch: any;
    loading: boolean;
    list: IChapterItem[];
    shared: SharedState;
};
type ConnectProps = {
    loading: any;
    common: any;
    shared: SharedState;
};

const ChapterResult: React.FunctionComponent<Props> = ({
    dispatch,
    loading,
    list = [],
    shared: { currentUrl },
}) => {
    const [selectedRows, setSelectedRows] = useState<IChapterItem[]>([]);
    const checkType = 'radio';

    function handleSelectRows(value: IChapterItem[]) {
        setSelectedRows(value);
    }

    function handleChapterSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error('请选择漫画章节！');
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
                selectedRows={selectedRows}
                data={list}
                columns={chapterColumns}
                onSelectRow={handleSelectRows}
            />
        </Fragment>
    );
};

export default connect(({ loading, common, shared }: ConnectProps) => ({
    loading: loading.models.common,
    list: common.list,
    currentUrl: shared.currentUrl,
}))(ChapterResult);
