import { Icon, Spin } from 'antd';
import React from 'react';
import styles from './index.less';

const Loading: React.FunctionComponent = () => (
    <div className={styles.loadingWrap}>
        <Spin
            indicator={<Icon type="loading" style={{ fontSize: 50 }} spin />}
            className={styles.loadingIcon}
        />
    </div>
);
export default Loading;
