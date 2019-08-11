import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Search from '../Search';

it('Page: Chpter  Snapshots', () => {
  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Search/>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
