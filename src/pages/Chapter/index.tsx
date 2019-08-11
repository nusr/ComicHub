import { Avatar, Button, message } from 'antd';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-locale';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate } from '../../utils';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';
import { TypeConfig } from '../../type';
import { ISearchItem } from '../../../server/type';
import { postItem } from '../../services';

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

interface Props {
  location: any;
}

const Chapter: React.FunctionComponent<Props> = (props: Props) => {
  const {
    location,
  } = props;
  const [selectedRows, setSelectedRows] = useState<ISearchItem[]>([]);
  const checkType = 'radio';
  const [list, setList] = useState<ISearchItem[]>([]);
  useEffect(() => {
    const { query } = location;
    postItem({
      url: query.url,
      name: query.name,
      type: TypeConfig.search,
    }).then(data => {
      setList(data);
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
    const [item] = selectedRows;
    router.push(`/${TypeConfig.download}?url=${location.query.url}&name=${encodeURIComponent(item.url)}`);
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
        checkType={checkType}
        selectedRows={selectedRows}
        data={list}
        columns={searchColumns}
        onSelectRow={handleSelectRows}
      />
    </Fragment>
  );
};


export default Chapter;
