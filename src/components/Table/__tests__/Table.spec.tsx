import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Table from '../Table';

describe('Table', () => {
  let wrapper: ReactTestRenderer | null = null;

  beforeEach(() => {
    wrapper = renderer.create(
      <Table />
    );
  });

  it('should return snapshot', () => {
    expect(wrapper!.toJSON()).toMatchSnapshot();
  });

  afterEach(() => {
    wrapper = null;
  })
})