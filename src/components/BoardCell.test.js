import React from 'react';
import { shallow } from 'enzyme';

import BoardCell from './BoardCell';
import { CELL_VALUES } from '../enums/board';

describe('BoardCell', () => {
  it('should render a <div />', () => {
    const mockCallBack = jest.fn();
    
    const wrapper = shallow((
      <BoardCell
        y={0}
        x={0}
        value={CELL_VALUES.CELL_X}
        clickHandler={mockCallBack}
      />
    ));
    
    expect(wrapper.find('div').length).toEqual(1);
  });

  it(`Has value of '${CELL_VALUES.CELL_X}'`, () => {
    const mockCallBack = jest.fn();
    
    const boardCell = shallow((
      <BoardCell
        y={0}
        x={0}
        value={CELL_VALUES.CELL_X}
        clickHandler={mockCallBack}
      />
    ));

    const text = boardCell.find('button').text();

    expect(text).toEqual(CELL_VALUES.CELL_X);
  });

  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const boardCell = shallow((
      <BoardCell
        y={0}
        x={0}
        value={CELL_VALUES.EMPTY}
        clickHandler={mockCallBack}
      />
    ));
    boardCell.find('button').simulate('click');
    
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
