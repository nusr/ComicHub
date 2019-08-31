import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Search from '../Search';
import Store from '../../store';
it('Page: Chpter  Snapshots', () => {
  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Store.Provider><Search/></Store.Provider>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
