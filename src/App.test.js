import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';
import Board from './components/Board';

// Main test
test('renders without crashing', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Tic-tac-toe/i);

  expect(title).toBeInTheDocument();
});

// Children components
it('should render the <Board /> component', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.containsMatchingElement(<Board />)).toEqual(true);
});
