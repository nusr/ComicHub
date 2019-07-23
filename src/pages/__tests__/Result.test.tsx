import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { Result } from '../Result';
import { SharedState } from '../../type';

function dispatch() {

}

describe('Page: Result', () => {
    it('Render correctly', () => {
        const shared: SharedState = { currentUrl: '', params: { name: '' } };
        const wrapper: ReactTestRenderer = renderer.create(<Result download="" dispatch={dispatch} shared={shared} />);
        expect(wrapper.root.children.length).toBe(1);
    });
});
