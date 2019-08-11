import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Help from './pages/Help';
import Layout from './pages/Layout';
import Search from './pages/Search';
import Chapter from './pages/Chapter';
import Images from './pages/Images';
import Result from './pages/Result';
import NotMatch from './pages/NotMatch';
import { history } from './utils';


type Props = {}
const Routes: React.FunctionComponent<Props> = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={(props: any) => <Layout {...props}><Search {...props}/></Layout>}/>
      <Route path="/chapter" render={(props: any) => <Layout {...props}><Chapter {...props}/></Layout>}/>
      <Route path="/images" render={(props: any) => <Layout {...props}><Images {...props}/></Layout>}/>
      <Route path="/result" render={(props: any) => <Layout {...props}><Result {...props}/></Layout>}/>
      <Route path="/help" render={(props: any) => <Layout {...props}><Help {...props}/></Layout>}/>
      <Route component={NotMatch}/>
    </Switch>
  </Router>
);

export default Routes;
