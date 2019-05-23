import { connect } from 'dva';
import React from 'react';

function DownloadResult(props) {
    const { downloadResult } = props;
    return <div>{downloadResult ? '下载中。。。' : '下载成功'}</div>;
}

export default connect(({ download }) => ({
    downloadResult: download.result,
}))(DownloadResult);
