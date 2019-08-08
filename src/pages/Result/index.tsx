import { connect } from 'dva';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import Loading from '../../components/Loading';
import { SharedState, TypeConfig } from '../../type';
import styles from './index.less';

interface Props {
  download: JsObject;
  dispatch: Function;
  shared: SharedState;
}

const Result: React.FunctionComponent<Props> = ({
  download: { downloadPath, result },
  dispatch,
  shared: { currentUrl, params },
}) => {
  useEffect(() => {
    dispatch({
      type: 'download/fetch',
      payload: {
        url: currentUrl,
        name: params.name,
        page_size: params.page_size,
        type: TypeConfig.download,
      },
    });
  }, []);
  let temp: React.ReactNode = <Loading />;

  if (result) {
    temp = (
      <div className={styles.pdf}>
        <div>
          <FormattedMessage id="page.Result.download.success" />
        </div>
        <div className={styles.downloadPath}>{downloadPath}</div>
      </div>
    );
  }
  return <div className={styles.container}>{temp}</div>;
};
interface ConnectProps {
  download: object;
  shared: SharedState;
}
export { Result };

export default connect(({ download, shared }: ConnectProps) => ({
  download,
  shared,
}))(Result);
