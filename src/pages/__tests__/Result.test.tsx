import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { Result } from '../Result';
import { SharedState } from '../../type';

describe('Page: Result', () => {
  it('Render correctly', () => {
    const shared: SharedState = { currentUrl: '', params: { name: '' } };
    const wrapper: ReactTestRenderer = renderer.create(
      <Result download={{}} dispatch={jest.fn()} shared={shared} />
    );
    expect(wrapper.root.children.length).toBe(1);
  });
  it('Page: Result Snapshots', () => {
    const shared: SharedState = { currentUrl: '', params: { name: '' } };
    const tree = renderer
      .create(<Result download={{}} dispatch={jest.fn()} shared={shared} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
