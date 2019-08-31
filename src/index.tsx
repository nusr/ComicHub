import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import './global.less';
import 'antd/dist/antd.css';
import Store from './store';

ReactDOM.render(
  <Store.Provider>
    <App/>
  </Store.Provider>
  ,
  document.getElementById('root'),
);
