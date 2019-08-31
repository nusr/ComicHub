import { Button, message } from 'antd';
import { getLanguageData } from '../../locales';
import React, { Fragment, useEffect, useState } from 'react';
import { getQuery, history } from '../../utils';
import DumpTable from '../../components/DumpTable';
import { IChapterItem } from '../../../server/type';
import { TypeConfig } from '../../type';
import { postItem } from '../../services';
import { Location } from 'history';
import Store from '../../store';
import { chapterColumns } from '../../services/columns';

interface Props {
  location: Location;
}

const ChapterResult: React.FunctionComponent<Props> = ({
  location,
}) => {
  const [selectedRows, setSelectedRows] = useState<IChapterItem[]>([]);
  const checkType = 'radio';
  const [list, setList] = useState<IChapterItem[]>([]);
  const query = getQuery(location.search);
  const { toggleLoading } = Store.useContainer();
  useEffect(() => {
    postItem({
      url: query.url,
      name: decodeURIComponent(query.name),
      type: TypeConfig.chapter,
    }).then(data => {
      setList(data);
      toggleLoading()
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
      <div className='submit-button'>
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
