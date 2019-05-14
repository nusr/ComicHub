import { Layout } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import Notification from '../../components/Notification';
import SearchBox from '../../components/SearchBox';
import SearchResult from '../../components/SearchResult';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

function HomePage(props) {
  const { dispatch } = props;
  console.log(props);
  useEffect(() => {
    dispatch({
      type: 'menu/fetch',
    });
  }, []);
  return (
    <Layout className={styles.mainLayout}>
      <Header className={styles.header}>
        <SearchBox />
      </Header>
      <Content className={styles.content}>
        <SearchResult />
      </Content>
      <Footer className={styles.footer}>
        <Notification />
      </Footer>
    </Layout>
  );
}

export default connect(({ menu }) => ({
  menu,
}))(HomePage);
