import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';
import Board from './components/Board';


describe('getInitialBoardState(...)', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<App />);
    const title = getByText(/Tic-tac-toe/i);

    expect(title).toBeInTheDocument();
  });

  it('should render the <Board /> component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<Board />)).toEqual(true);
  });

  it('Board cells have been fully filled, no one was won, so it displays a message saying the game is tied', async () => {
    const {
      getByTestId,
      getByText
    } = render(<App />);

    /**
     * Values
     * X, O, X
     * X, O, X
     * O, X, X
     * 
     * Sequence
     * 1, 2, 7
     * 3, 4, 8
     * 6, 5, 9
     */

    await wait(() => fireEvent.click(getByTestId('0,0')));
    await wait(() => fireEvent.click(getByTestId('1,0')));
    await wait(() => fireEvent.click(getByTestId('0,1')));
    await wait(() => fireEvent.click(getByTestId('1,1')));
    await wait(() => fireEvent.click(getByTestId('1,2')));
    await wait(() => fireEvent.click(getByTestId('0,2')));
    await wait(() => fireEvent.click(getByTestId('2,0')));
    await wait(() => fireEvent.click(getByTestId('2,1')));
    await wait(() => fireEvent.click(getByTestId('2,2')));

    expect(getByText('The game is TIED, please restart')).toBeDefined();
  });
});
