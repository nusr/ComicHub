import 'jest';
import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Help from '../Help';

describe('Page: Help', () => {
    it('Render correctly', () => {
        const wrapper: ReactTestRenderer = renderer.create(<Help />);
        expect(wrapper.root.children.length).toBe(1);
    });
});
