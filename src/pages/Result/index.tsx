import { connect } from 'dva';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import Loading from '../../components/Loading';
import { typeConfig } from '../../utils';
import { SharedState } from '../../type';
import styles from './index.less';

type Props = {
    download: any;
    dispatch: any;
    shared: SharedState;
}

const DownloadResult: React.FunctionComponent<Props> = ({
    download: {
        downloadPath,
        result,
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
            <div>
                <span><FormattedMessage id="page.Result.download.success" /></span>
                <span className={styles.downloadPath}>{downloadPath}</span>
            </div>
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
