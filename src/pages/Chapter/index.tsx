import { Button, message } from 'antd';
import { Location } from 'history';
import { getLanguageData } from '../../locales';
import React, { Fragment, useEffect, useState } from 'react';
import { getQuery, history } from '../../utils';
import DumpTable from '../../components/DumpTable';
import { TypeConfig } from '../../type';
import { ISearchItem } from '../../../server/type';
import { postItem } from '../../services';
import Store from '../../store';
import { searchColumns } from '../../services/columns';

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
  const { toggleLoading } = Store.useContainer();
  useEffect(() => {
    postItem({
      url: query.url,
      name: query.name,
      type: TypeConfig.search,
    }).then(data => {
      setList(data);
      toggleLoading()
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
        columns={searchColumns}
        onSelectRow={handleSelectRows}
      />
    </Fragment>
  );
};


export default Chapter;
