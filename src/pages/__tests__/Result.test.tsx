import React from 'react';
import renderer  from 'react-test-renderer';
import Result from '../Result';
import Store from '../../store';
it('Page: Result Snapshots', () => {
  const location = { pathname: '', search: '?', hash: '', state: '' };
  const tree = renderer
    .create(<Store.Provider><Result location={location}/></Store.Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
