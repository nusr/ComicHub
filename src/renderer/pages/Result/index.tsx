import { connect } from 'dva';
import React, { useEffect } from 'react';
import Loading from '../../components/Loading';
import { typeConfig } from '../config';
import { SharedState } from '../../type';
import styles from './index.less';

type Props = {
    download: any;
    dispatch: any;
    shared: SharedState;
}

const DownloadResult: React.FunctionComponent<Props> = ({
    download: {
        result,
        downloadPath,
    }, dispatch, shared: { currentUrl, params },
}) => {
    useEffect(() => {
        dispatch({
            type: 'download/fetch',
            payload: {
                url: currentUrl,
                name: params.name,
                page_size: params.page_size,
                type: typeConfig.download,
            },
        });
    }, []);
    let temp: React.ReactNode = <Loading />;
    if (result) {
        temp = (
            <span>
下载成功，下载地址为：
                <span className={styles.downloadPath}>{downloadPath}</span>
            </span>
        );
    }
    return (
        <div className={styles.container}>
            {temp}
        </div>
    );
};
type ConnectProps = {
    download: any;
    shared: SharedState;
}

export default connect(({ download, shared }: ConnectProps) => ({
    download,
    shared,
}))(DownloadResult);
