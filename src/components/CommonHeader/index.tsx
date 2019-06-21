import { Icon, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import Link from 'umi/link';
import SelectLang from '../SelectLang';
import styles from './index.less';

type Props = {};

const CommonHeader: React.FunctionComponent<Props> = () => (
    <div className={styles.container}>
        <Link to="/">
            <h1 className={styles.title}>ComicHub</h1>
        </Link>
        <div style={{ fontSize: 20 }}>
            <SelectLang />
            <Tooltip title={<FormattedMessage id="component.CommonHeader.tooltip" />} className={styles.help}>
                <Icon type="question-circle" />
            </Tooltip>
        </div>
    </div>
);
export default CommonHeader;
