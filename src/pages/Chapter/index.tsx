import { Avatar, Button, message } from 'antd';
import { connect } from 'dva';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate, typeConfig } from '../config';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';
import { SharedState } from '../../type';
import { ISearchItem } from '../../type/sql';

const searchColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '名称',
        dataIndex: 'title',
    },
    {
        title: '作者',
        dataIndex: 'author',
    },
    {
        title: '链接',
        dataIndex: 'url',
        render: (text: string) => (
            <a title={text} target="_blank" href={text} rel="noopener noreferrer">
                {text}
            </a>
        ),

    },

    {
        title: '地区',
        dataIndex: 'area',
    },
    {
        title: '分类',
        dataIndex: 'category',
    },
    {
        title: '封面',
        dataIndex: 'cover',
        render: (text: string) => (text
            ? (
                <a target="_blank" href={text} rel="noopener noreferrer">
                    <Avatar src={text} />
                </a>
            )
            : ''),

    },
    {
        title: '爬取时间',
        dataIndex: 'create_time',
        render: renderDate,
    },
];

type Props = {
    shared: SharedState;
    list: ISearchItem[];
    dispatch: any;
    loading: boolean;
}

const SearchResult: React.FunctionComponent<Props> = ({
    dispatch,
    loading,
    list = [],
    shared: { currentUrl, params },
}) => {
    const [
        selectedRows,
        setSelectedRows,
    ] = useState<ISearchItem[]>([]);
    const checkType: string = 'radio';
    useEffect(() => {
        dispatch({
            type: 'common/fetch',
            payload: {
                url: currentUrl,
                name: params.name,
                type: typeConfig.search,
                noCache: params.noCache,
            },
        });
    }, []);


    function handleSelectRows(value: ISearchItem[]) {
        setSelectedRows(value);
    }

    function handleChapterSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error('请选择漫画！');
            return;
        }
        const item: ISearchItem = selectedRows[0];
        dispatch({
            type: 'shared/changeParams',
            payload: {
                name: item.url,
            },
        });
        // TODO 跳转
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
                columns={searchColumns}
                onSelectRow={handleSelectRows}
            />
        </Fragment>
    );
};
type ConnectProps = {
    loading: any;
    common: any;
    shared: SharedState;
};
export default connect(({ loading, common, shared }: ConnectProps) => ({
    loading: loading.models.common,
    list: common.list,
    shared,
}))(SearchResult);
