import { Avatar, Button, message } from 'antd';
import { Location } from 'history'
import { getLanguageData } from '../../locales';
import React, { Fragment, useEffect, useState } from 'react';
import { renderDate, getQuery, history } from '../../utils';
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
    title: getLanguageData('page.Chapter.table.title'),
  },
  {
    dataIndex: 'author',
    title: getLanguageData('page.Chapter.table.author'),
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
    dataIndex: 'area',
    title: getLanguageData('page.Chapter.table.area'),
  },
  {
    dataIndex: 'category',
    title: getLanguageData('page.Chapter.table.category'),
  },
  {
    dataIndex: 'cover',
    title: getLanguageData('page.Chapter.table.cover'),
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
    title: getLanguageData('page.Chapter.table.create_time'),
    render: renderDate,
  },
];

interface Props {
  location: Location;
}

const Chapter: React.FunctionComponent<Props> = (props: Props) => {
  const {
    location,
  } = props;
  const [selectedRows, setSelectedRows] = useState<ISearchItem[]>([]);
  const checkType = 'radio';
  const [list, setList] = useState<ISearchItem[]>([]);
  const query = getQuery(location.search);
  useEffect(() => {
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
      message.error(getLanguageData('page.Chapter.select.tip'));
      return;
    }
    const [item] = selectedRows;
    const link = `/${TypeConfig.download}?url=${query.url}&name=${encodeURIComponent(item.url)}`;
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
        columns={searchColumns}
        onSelectRow={handleSelectRows}
      />
    </Fragment>
  );
};


export default Chapter;
