import { Button, message } from 'antd';
import { getLanguageData } from '../../locales';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate, history, getQuery } from '../../utils';
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
    title: getLanguageData('page.Chapter.table.title'),
  },
  {
    dataIndex: 'url',
    title: getLanguageData('page.Chapter.table.url'),
    render: (text: string) => (
      <a title={text} target="_blank" href={text} rel="noopener noreferrer">
        {text}
      </a>
    ),
  },
  {
    dataIndex: 'page_size',
    title: getLanguageData('page.Images.table.page_size'),
  },
  {
    dataIndex: 'create_time',
    title: getLanguageData('page.Chapter.table.create_time'),
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
  const query = getQuery(location.search);
  useEffect(() => {
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
      message.error(getLanguageData('page.Images.select.tip'));
      return;
    }
    const [item] = selectedRows;
    const link = `/${TypeConfig.result}?url=${query.url}&name=${encodeURIComponent(item.url)}&page_size=${item.page_size}`;
    history.push(link);
  }

  return (
    <Fragment>
      <div className={styles.submit}>
        <Button
          type="primary"
          onClick={handleChapterSubmit}
          disabled={selectedRows.length === 0}
        >
          {getLanguageData('component.button.submit')}
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
