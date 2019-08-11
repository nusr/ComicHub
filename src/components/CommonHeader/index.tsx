import { Icon, Tooltip } from 'antd';
import React from 'react';
import { getLanguageData } from '../../locales';
import { Link } from 'react-router-dom';
import styles from './index.less';

type Props = {}

const CommonHeader: React.FunctionComponent<Props> = ({ children }) => (
  <React.Fragment>
    <Link to="/">
      <h1 className={styles.title}>ComicHub</h1>
    </Link>
    <div style={{ fontSize: 20 }}>
      {children}
      <Tooltip
        title={getLanguageData("component.CommonHeader.tooltip")}
        className={styles.help}
      >
        <Icon type="question-circle"/>
      </Tooltip>
    </div>
  </React.Fragment>
);
export default CommonHeader;
