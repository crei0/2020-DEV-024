import React from 'react';
import { shallow } from 'enzyme';

import BoardCell from './BoardCell';
import { CELL_VALUES } from '../enums/board';

describe('BoardCell', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<BoardCell />);
    
    expect(wrapper.find('div').length).toEqual(1);
  });

  it(`Has text value of ${CELL_VALUES.CELL_X}`, () => {
    const boardCell = shallow((
      <BoardCell
        y={0}
        x={0}
        value={CELL_VALUES.CELL_X}
      />
    ));

    const text = boardCell.find('button').text();

    expect(text).toEqual(CELL_VALUES.CELL_X);
  });
});
