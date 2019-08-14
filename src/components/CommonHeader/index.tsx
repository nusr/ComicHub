import { Icon, Tooltip } from 'antd';
import React from 'react';
import { getLanguageData } from '../../locales';
import { Link } from 'react-router-dom';
import './index.less'
type Props = {}

const CommonHeader: React.FunctionComponent<Props> = ({ children }) => (
  <React.Fragment>
    <Link to="/">
      <h1 className='header-title'>ComicHub</h1>
    </Link>
    <div className="header-content">
      {children}
      <Tooltip
        title={getLanguageData("component.CommonHeader.tooltip")}
        className='header-help'
      >
        <Icon type="question-circle"/>
      </Tooltip>
    </div>
  </React.Fragment>
);
export default CommonHeader;
