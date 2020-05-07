import React from 'react';
import TableRow from '../TableRow';

import renderer from 'react-test-renderer';

describe('TableRow', () => {
  it('should return snapshot', () => {
    const wrapper = renderer.create(
      <TableRow
        idx={0}
        key={0}
        onChartOpen={jest.fn()}
        data={{ country: 'USA', cases: 20, deaths: 1, countryInfo: { flag: 'path/to/flag' } }}
      />
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});