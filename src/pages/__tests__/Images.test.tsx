import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Images from '../Images';
import Store from '../../store';
it('Page: Images  Snapshots', () => {
  const location = { pathname: '', search: '?', hash: '', state: '' };


  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Store.Provider><Images location={location}/></Store.Provider>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
