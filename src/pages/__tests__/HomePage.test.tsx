import React from 'react';
import HomePage, { getCurrentStep } from '../HomePage';
import { TypeConfig } from '../../type';

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
