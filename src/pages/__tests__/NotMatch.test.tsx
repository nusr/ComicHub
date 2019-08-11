import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { Router } from 'react-router-dom';
import { history } from '../../utils';
import NotMatch from '../NotMatch';

it('Page: Chpter  Snapshots', () => {
  const location = { pathname: 'test', search: '', hash: '', state: '' };

  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Router history={history}><NotMatch location={location}/></Router>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
