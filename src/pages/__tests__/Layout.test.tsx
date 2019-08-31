import Layout, { getCurrentStep } from '../Layout';
import { TypeConfig } from '../../type';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import React from 'react';
import { Router } from 'react-router-dom';
import { history } from '../../utils';
import Store from '../../store';
describe('getCurrentStep', () => {
  it('getCurrentStep Should Right Result', () => {
    expect(getCurrentStep(TypeConfig.search)).toBe(0);
    expect(getCurrentStep(TypeConfig.chapter)).toBe(1);
    expect(getCurrentStep(TypeConfig.download)).toBe(2);
    expect(getCurrentStep(TypeConfig.result)).toBe(3);
  });
  it('getCurrentStep Should Handle Non String', () => {
    expect(getCurrentStep()).toBe(0);
    expect(getCurrentStep('test')).toBe(0);
    expect(getCurrentStep('测试')).toBe(0);
  });
});


it('Page: Layout Snapshots', () => {
  const location = { pathname: '/chapter', search: '', hash: '', state: '' };
  let tree: ReactTestRenderer;
  renderer.act(() => {
    tree = renderer
      .create(<Store.Provider><Router history={history}><Layout location={location}/></Router></Store.Provider>);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
