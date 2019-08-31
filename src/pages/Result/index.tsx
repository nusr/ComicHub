import React, { useEffect, useState } from 'react';
import { Icon, Spin } from 'antd';
import { getLanguageData } from '../../locales';
import { TypeConfig } from '../../type';
import './index.less';
import { postItem } from '../../services';
import { getQuery } from '../../utils';
import { Location } from 'history';

interface Props {
  location: Location;
}

const Result: React.FunctionComponent<Props> = ({
  location,
}) => {
  const [result, setResult] = useState<boolean>(false);
  const [downloadPath, setDownloadPath] = useState<string>('');
  useEffect(() => {
    const query = getQuery(location.search);
    postItem({
      url: query.url,
      name: query.name,
      page_size: query.page_size,
      type: TypeConfig.download,
    }).then((response) => {
      const checkCode: boolean = response && response.code === 200;
      setResult(checkCode);
      setDownloadPath(response && response.data);
    });
  }, []);
  let temp: React.ReactNode = <Spin indicator={<Icon type="loading" style={{ fontSize: 50 }} spin/>}/>;

  if (result) {
    temp = (
      <div className='result-pdf'>
        <div>
          {getLanguageData('page.Result.download.success')}
        </div>
        <div className='result-path'>{downloadPath}</div>
      </div>
    );
  }
  return <div className='result'>{temp}</div>;
};
export default Result;
