import { Icon, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import Link from 'umi/link';
import styles from './index.less';

type Props = {};

const CommonHeader: React.FunctionComponent<Props> = ({ children }) => (
  <React.Fragment>
    <Link to="/">
      <h1 className={styles.title}>ComicHub</h1>
    </Link>
    <div style={{ fontSize: 20 }}>
      {children}
      <Tooltip
        title={<FormattedMessage id="component.CommonHeader.tooltip" />}
        className={styles.help}
      >
        <Icon type="question-circle" />
      </Tooltip>
    </div>
  </React.Fragment>
);
export default CommonHeader;
