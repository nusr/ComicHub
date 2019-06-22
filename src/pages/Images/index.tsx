import { Button, message } from 'antd';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-locale';
import router from 'umi/router';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate, typeConfig } from '../../utils';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';
import { IChapterItem } from '../../type/sql';
import { SharedState } from '../../type';

const chapterColumns = [
    {
        dataIndex: 'id',
        title: 'ID',
    },
    {
        dataIndex: 'title',
        title: <FormattedMessage id="page.Chapter.table.title" />,
    },
    {
        dataIndex: 'url',
        title: <FormattedMessage id="page.Chapter.table.url" />,
        render: (text: string) => (
            <a title={text} target="_blank" href={text} rel="noopener noreferrer">
                {text}
            </a>
        ),

    },
    {
        dataIndex: 'page_size',
        title: <FormattedMessage id="page.Images.table.page_size" />,
    },
    {
        dataIndex: 'create_time',
        title: <FormattedMessage id="page.Chapter.table.create_time" />,
        render: renderDate,
    },
];

type Props = {
    dispatch: any;
    loading: boolean;
    list: IChapterItem[];
    shared: SharedState;
};


const ChapterResult: React.FunctionComponent<Props> = ({
    dispatch,
    loading,
    list = [],
    shared: { currentUrl, params },
}) => {
    const [
        selectedRows,
        setSelectedRows,
    ] = useState<IChapterItem[]>([]);
    const checkType: string = 'radio';

    useEffect(() => {
        dispatch({
            type: 'common/fetch',
            payload: {
                url: currentUrl,
                name: params.name,
                type: typeConfig.chapter,
            },
        });
    }, []);

    function handleSelectRows(value: IChapterItem[]) {
        setSelectedRows(value);
    }

    function handleChapterSubmit() {
        if (!selectedRows || selectedRows.length === 0) {
            message.error(<FormattedMessage id="page.Images.select.tip" />);
            return;
        }
        const item = selectedRows[0];

        dispatch({
            type: 'shared/changeParams',
            payload: {
                name: item.url,
                page_size: item.page_size,
            },
        });
        router.push(`/${typeConfig.result}`);
    }

    return (
        <Fragment>
            <div className={styles.submit}>
                <Button
                    type="primary"
                    onClick={handleChapterSubmit}
                    disabled={selectedRows.length === 0}
                >
                    <FormattedMessage id="component.button.submit" />
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
type ConnectProps = {
    loading: any;
    common: any;
    shared: SharedState;
};
export default connect(({ loading, common, shared }: ConnectProps) => ({
    loading: loading.models.common,
    list: common.list,
    shared,
}))(ChapterResult);
