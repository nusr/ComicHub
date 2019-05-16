import { Card, Layout } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import Notification from '../../components/Notification';
import SearchBox from '../../components/SearchForm';
import SearchResult from '../../components/SearchResult';
import styles from './index.less';

const { Footer } = Layout;

function getMenuList(data = {}) {
  return Object.keys(data).map((key: string) => {
    const item = data[key];
    return {
      value: key,
      ...item,
    };
  });
}

function HomePage(props) {
  const {
    dispatch,
    menu: { list },
  } = props;
  const menuList = getMenuList(list);
  console.log(menuList);
  console.log(props);
  useEffect(() => {
    dispatch({
      type: 'menu/fetch',
    });
  }, []);
  return (
    <div className={styles.mainLayout}>
      <Card className={styles.header}>
        <SearchBox />
      </Card>
      <div className={styles.content}>
        <SearchResult />
      </div>
      <Footer className={styles.footer}>
        <Notification />
      </Footer>
    </div>
  );
}

export default connect(({ menu }) => ({
  menu,
}))(HomePage);
