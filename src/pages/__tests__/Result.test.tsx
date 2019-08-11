import React from 'react';
import renderer  from 'react-test-renderer';
import Result from '../Result';

it('Page: Result Snapshots', () => {
  const location = { pathname: '', search: '?', hash: '', state: '' };
  const tree = renderer
    .create(<Result location={location}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
