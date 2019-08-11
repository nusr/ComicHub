import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import Loading from '../../components/Loading';
import { TypeConfig } from '../../type';
import styles from './index.less';
import { postItem } from '../../services';

interface Props {
  location: any;
}

const Result: React.FunctionComponent<Props> = ({
  location,
}) => {
  const [result, setResult] = useState<boolean>(false);
  const [downloadPath, setDownloadPath] = useState<string>('');
  useEffect(() => {
    const { query } = location;
    postItem({
      url: query.url,
      name: query.name,
      page_size: query.page_size,
      type: TypeConfig.download,
    }).then((response: any) => {
      const checkCode: boolean = response && response.code === 200;
      setResult(checkCode);
      setDownloadPath(response && response.data);
    });
  }, []);
  let temp: React.ReactNode = <Loading/>;

  if (result) {
    temp = (
      <div className={styles.pdf}>
        <div>
          <FormattedMessage id="page.Result.download.success"/>
        </div>
        <div className={styles.downloadPath}>{downloadPath}</div>
      </div>
    );
  }
  return <div className={styles.container}>{temp}</div>;
};
export default Result;
