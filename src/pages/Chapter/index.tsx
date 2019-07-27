import { Avatar, Button, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-locale';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate } from '../../utils';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';
import { SharedState, TypeConfig } from '../../type';
import { ISearchItem } from '../../../server/type';

const searchColumns = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'title',
    title: <FormattedMessage id="page.Chapter.table.title"/>,
  },
  {
    dataIndex: 'author',
    title: <FormattedMessage id="page.Chapter.table.author"/>,
  },
  {
    dataIndex: 'url',
    title: <FormattedMessage id="page.Chapter.table.url"/>,
    render: (text: string) => (
      <a title={text} target="_blank" href={text} rel="noopener noreferrer">
        {text}
      </a>
    ),
  },

  {
    dataIndex: 'area',
    title: <FormattedMessage id="page.Chapter.table.area"/>,
  },
  {
    dataIndex: 'category',
    title: <FormattedMessage id="page.Chapter.table.category"/>,
  },
  {
    dataIndex: 'cover',
    title: <FormattedMessage id="page.Chapter.table.cover"/>,
    render: (text: string) =>
      text ? (
        <a target="_blank" href={text} rel="noopener noreferrer">
          <Avatar src={text}/>
        </a>
      ) : (
        ''
      ),
  },
  {
    dataIndex: 'create_time',
    title: <FormattedMessage id="page.Chapter.table.create_time"/>,
    render: renderDate,
  },
];

type Props = {
  shared: SharedState;
  list: ISearchItem[];
  dispatch: (params: { type: string; payload: object }) => void;
  loading: boolean;
};

const Chapter: React.FunctionComponent<Props> = ({
  dispatch,
  loading,
  list = [],
  shared: { currentUrl, params },
}) => {
  const [selectedRows, setSelectedRows] = useState<ISearchItem[]>([]);
  const checkType = 'radio';
  useEffect(() => {
    dispatch({
      type: 'common/fetch',
      payload: {
        url: currentUrl,
        name: params.name,
        type: TypeConfig.search,
        cache: params.cache,
      },
    });
  }, []);

  function handleSelectRows(value: ISearchItem[]): void {
    setSelectedRows(value);
  }

  function handleChapterSubmit(): void {
    if (!selectedRows || selectedRows.length === 0) {
      message.error(<FormattedMessage id="page.Chapter.select.tip"/>);
      return;
    }
    const item: ISearchItem = selectedRows[0];
    dispatch({
      type: 'shared/changeParams',
      payload: {
        name: item.url,
      },
    });
    router.push(`/${TypeConfig.download}`);
  }

  return (
    <Fragment>
      <div className={styles.submit}>
        <Button
          type="primary"
          onClick={handleChapterSubmit}
          disabled={selectedRows.length === 0}
        >
          <FormattedMessage id="component.button.submit"/>
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
  loading: JsObject;
  common: JsObject ;
  shared: SharedState;
};
export { Chapter };
export default connect(({ loading, common, shared }: ConnectProps) => ({
  loading: loading.models.common,
  list: common.list,
  shared,
}))(Chapter);
