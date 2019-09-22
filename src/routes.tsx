import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Location } from 'history';
import Help from './pages/Help';
import Layout from './pages/Layout';
import Search from './pages/Search';
import Chapter from './pages/Chapter';
import Images from './pages/Images';
import Result from './pages/Result';
import NotMatch from './pages/NotMatch';
import { history } from './utils';
import { Spin } from 'antd';
import Store from './store';

type componentProps = {
  location: Location;
};
type Props = {};
const Routes: React.FunctionComponent<Props> = () => {
  const { isLoading } = Store.useContainer();
  return (
    <Router history={history}>
      {isLoading && (
        <div className="page-loading">
          <Spin size="large" />
        </div>
      )}
      <Switch>
        <Route
          path="/"
          exact
          render={(props: componentProps): JSX.Element => (
            <Layout {...props}>
              <Search />
            </Layout>
          )}
        />
        <Route
          path="/chapter"
          render={(props: componentProps): JSX.Element => (
            <Layout {...props}>
              <Chapter {...props} />
            </Layout>
          )}
        />
        <Route
          path="/images"
          render={(props: componentProps): JSX.Element => (
            <Layout {...props}>
              <Images {...props} />
            </Layout>
          )}
        />
        <Route
          path="/result"
          render={(props: componentProps): JSX.Element => (
            <Layout {...props}>
              <Result {...props} />
            </Layout>
          )}
        />
        <Route
          path="/help"
          render={(props: componentProps): JSX.Element => (
            <Layout {...props}>
              <Help />
            </Layout>
          )}
        />
        <Route component={NotMatch} />
      </Switch>
    </Router>
  );
};

export default Routes;
