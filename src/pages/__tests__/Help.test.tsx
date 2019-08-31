import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Help from '../Help';
import Store from '../../store';
describe('Page: Help', () => {
  it('Render correctly', () => {
    const wrapper: ReactTestRenderer = renderer.create(<Store.Provider><Help/></Store.Provider>);
    expect(wrapper.root.children.length).toBeGreaterThan(1);
  });
  it('Page: Help Snapshots', () => {
    const tree = renderer.create(<Store.Provider><Help/></Store.Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
