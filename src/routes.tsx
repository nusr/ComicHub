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

type componentProps = {
  location: Location;
}
type Props = {}
const Routes: React.FunctionComponent<Props> = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={(props: componentProps) => <Layout {...props}><Search/></Layout>}/>
      <Route path="/chapter" render={(props: componentProps) => <Layout {...props}><Chapter {...props}/></Layout>}/>
      <Route path="/images" render={(props: componentProps) => <Layout {...props}><Images {...props}/></Layout>}/>
      <Route path="/result" render={(props: componentProps) => <Layout {...props}><Result {...props}/></Layout>}/>
      <Route path="/help" render={(props: componentProps) => <Layout {...props}><Help/></Layout>}/>
      <Route component={NotMatch}/>
    </Switch>
  </Router>
);

export default Routes;
