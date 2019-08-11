import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Chapter from '../Chapter';

it('Page: Chpter  Snapshots', () => {
  const location = { pathname: 'test', search: '?', hash: '', state: '' };

  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Chapter location={location}/>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
