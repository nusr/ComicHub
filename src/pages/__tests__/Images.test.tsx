import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Images from '../Images';

it('Page: Images  Snapshots', () => {
  const location = { pathname: '', search: '?', hash: '', state: '' };


  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Images location={location}/>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
