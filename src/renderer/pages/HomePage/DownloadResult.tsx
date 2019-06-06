import { connect } from 'dva';
import React from 'react';
import Loading from '../../components/Loading';

type Props = {
    downloadResult: boolean;
}

const DownloadResult: React.FunctionComponent<Props> = ({ downloadResult }) => {
    if (downloadResult) {
        return <div style={{ textAlign: 'center' }}>下载成功!</div>;
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <Loading text="下载中" />
        </div>
    );
};

export default connect(({ download }: { download: any }) => ({
    downloadResult: download.result,
}))(DownloadResult);
