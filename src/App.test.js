import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Main test
test('renders without crashing', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Tic-tac-toe/i);

  expect(title).toBeInTheDocument();
});
