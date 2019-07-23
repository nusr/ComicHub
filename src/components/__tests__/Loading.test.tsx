import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Loading from '../Loading';

describe('Component: Loading', () => {
    it('Render correctly', () => {
        const wrapper: ReactTestRenderer = renderer.create(<Loading />);
        const testInstance = wrapper.root;
        expect(testInstance.children.length).toBe(1);
    });
    it('Component: Loading Snapshots', () => {
        const tree = renderer.create(<Loading />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
