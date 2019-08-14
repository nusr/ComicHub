import { Icon, Spin } from 'antd';
import React from 'react';
import './index.less';

type Props = {}
const Loading: React.FunctionComponent<Props> = () => (
  <div className='loading'>
    <Spin
      indicator={<Icon type="loading" style={{ fontSize: 50 }} spin/>}
      className='loading-icon'
    />
  </div>
);
export default Loading;
