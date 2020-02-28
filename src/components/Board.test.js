import React from 'react';
import { render } from '@testing-library/react';

import Board from './Board';

// Board is rendering correctly?
describe('Board', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<Board />);

    const title = getByText(/The current player is 'X'/i);

    expect(title).toBeInTheDocument();
  });
});