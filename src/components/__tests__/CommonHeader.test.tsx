import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import { history } from '../../utils';
import CommonHeader from '../CommonHeader';

it('Page: Chpter  Snapshots', () => {
  const tree = renderer.create(<Router history={history}><CommonHeader/></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
