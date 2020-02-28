import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Board from './Board';
import BoardCell from './BoardCell';

// Board is rendering correctly?
describe('Board', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<Board />);

    const title = getByText(/The current player is 'X'/i);

    expect(title).toBeInTheDocument();
  });

  test('renders 9 <BoardCell />', () => {
    const wrapper = shallow(<BoardCell />);

    expect(wrapper.find(BoardCell)).to.have.length(9);
  });
});