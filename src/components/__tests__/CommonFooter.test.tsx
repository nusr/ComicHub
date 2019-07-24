import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import CommonFooter from '../CommonFooter';

describe('Component: CommonFooter', () => {
  it('Render correctly', () => {
    const wrapper: ReactTestRenderer = renderer.create(<CommonFooter />);
    expect(wrapper.root.children.length).toBe(1);
  });
  it('Component: CommonFooter Snapshots', () => {
    const tree = renderer.create(<CommonFooter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
