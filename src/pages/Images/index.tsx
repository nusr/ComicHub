import { Button, message } from 'antd';
import { FormattedMessage } from 'umi-plugin-locale';
import router from 'umi/router';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate } from '../../utils';
import styles from './index.less';
import DumpTable from '../../components/DumpTable';
import { IChapterItem } from '../../../server/type';
import { TypeConfig } from '../../type';
import { postItem } from '../../services';

const chapterColumns = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'title',
    title: <FormattedMessage id="page.Chapter.table.title"/>,
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
    dataIndex: 'page_size',
    title: <FormattedMessage id="page.Images.table.page_size"/>,
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

const ChapterResult: React.FunctionComponent<Props> = ({
  location,
}) => {
  const [selectedRows, setSelectedRows] = useState<IChapterItem[]>([]);
  const checkType = 'radio';
  const [list, setList] = useState<IChapterItem[]>([]);
  useEffect(() => {
    const { query } = location;
    postItem({
      url: query.url,
      name: decodeURIComponent(query.name),
      type: TypeConfig.chapter,
    }).then(data => {
      setList(data);
    });
  }, []);

  function handleSelectRows(value: IChapterItem[]): void {
    setSelectedRows(value);
  }

  function handleChapterSubmit(): void {
    if (!selectedRows || selectedRows.length === 0) {
      message.error(<FormattedMessage id="page.Images.select.tip"/>);
      return;
    }
    const [item] = selectedRows;
    router.push(`/${TypeConfig.result}?url=${location.query.url}&name=${encodeURIComponent(item.url)}&page_size=${item.page_size}`);
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
        columns={chapterColumns}
        onSelectRow={handleSelectRows}
      />
    </Fragment>
  );
};

export default ChapterResult;
