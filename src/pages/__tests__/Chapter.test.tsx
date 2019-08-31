import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Chapter from '../Chapter';
import Store from '../../store';

it('Page: Chpter  Snapshots', () => {
  const location = { pathname: 'test', search: '?', hash: '', state: '' };

  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Store.Provider><Chapter location={location}/></Store.Provider>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
