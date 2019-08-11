import React from 'react';
import renderer from 'react-test-renderer';
import CommonFooter from '../CommonFooter';

it('Component: CommonFooter Snapshots', () => {
  const tree = renderer.create(<CommonFooter/>).toJSON();
  expect(tree).toMatchSnapshot();
});

