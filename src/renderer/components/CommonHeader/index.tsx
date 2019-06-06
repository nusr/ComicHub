import React from 'react';
import Link from 'umi/link';
import { Icon, Tooltip } from 'antd';
import styles from './index.less';

type Props = {};

const CommonHeader: React.FunctionComponent<Props> = () => (
    <div className={styles.container}>
        <Link to="/">
            <h1 className={styles.title}>ComicHub</h1>
        </Link>
        <div>
            <Tooltip title="帮助">
                <Icon type="question-circle" />
            </Tooltip>
        </div>
    </div>
);
export default CommonHeader;
