import { connect } from 'dva';
import React from 'react';
import Loading from '../../components/Loading';

function DownloadResult(props) {
    const { downloadResult } = props;
    if (downloadResult) {
        return <div style={{ textAlign: 'center' }}>下载成功!</div>;
    }
    return <Loading text="下载中。。。" />;
}

export default connect(({ download }) => ({
    downloadResult: download.result,
}))(DownloadResult);
