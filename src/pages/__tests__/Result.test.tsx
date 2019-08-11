import React from 'react';
import renderer  from 'react-test-renderer';
import Result from '../Result';

it('Page: Result Snapshots', () => {
  const location = { query: { name: '', url: '', page_size: 0 } };
  const tree = renderer
    .create(<Result location={location}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
