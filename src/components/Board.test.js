import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import 
  Board,
  {
    getInitialBoardState,
    checkIfPlayerWon,
    checkIfGameIsTiedAndNotWon,
    getCurrentGameStateMessage,
    calculateNewGameState
  } from './Board';
import { PLAYER, GAME_STATE, CELL_VALUES } from '../enums/board';
import BoardCell from './BoardCell';

// Board is rendering correctly?
describe('Board', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<Board />);

    const title = getByText(/The current player is 'X'/i);

    expect(title).toBeInTheDocument();
  });

  test('renders 9 <BoardCell />', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(BoardCell).length).toBe(9);
  });
});

describe('getInitialBoardState(...)', () => {
  test('getInitialBoardState() returns an empty grid state', () => {
    const expectedResult = {
      grid: [
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
      ],
      currentPlayer: PLAYER.X,
      gameState: GAME_STATE.PLAYING
    };

    expect(getInitialBoardState()).toStrictEqual(expectedResult);
  });
});

describe('checkIfPlayerWon(...)', () => {
  // Column 1
  test('checkIfPlayerWon(grid) detects that one player has won using the 1st column', () => {
    const gridState = [
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.EMPTY],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.EMPTY],
      [CELL_VALUES.CELL_X, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Column 2
  test('checkIfPlayerWon(grid) detects that one player has won using the 2nd column', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.EMPTY],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_X, CELL_VALUES.EMPTY]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Column 3
  test('checkIfPlayerWon(grid) detects that one player has won using the 3rd column', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Row 1
  test('checkIfPlayerWon(grid) detects that one player has won using the 1st row', () => {
    const gridState = [
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Row 2
  test('checkIfPlayerWon(grid) detects that one player has won using the 2nd row', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.EMPTY],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Row 3
  test('checkIfPlayerWon(grid) detects that one player has won using the 3rd row', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_X]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Diagonal from the top left to the bottom right
  test('checkIfPlayerWon(grid) detects that one player has won using the diagonal from the top left to the bottom right', () => {
    const gridState = [
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_O],
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_X, CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // Diagonal from the bottom left to the top right
  test('checkIfPlayerWon(grid) detects that one player has won using the diagonal from the bottom left to the top right', () => {
    const gridState = [
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_X, CELL_VALUES.EMPTY],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_O]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  // No one won
  test('checkIfPlayerWon(grid) detects that no one has won', () => {
    const gridState = [
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_O],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X]
    ];

    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(false);
  });
});

describe('checkIfGameIsTiedAndNotWon(...)', () => {
  test('checkIfGameIsTiedAndNotWon(grid) detects the game is tied', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X]
    ];

    const returnedResult = checkIfGameIsTiedAndNotWon(gridState);

    expect(returnedResult).toEqual(true);
  });

  test('checkIfGameIsTiedAndNotWon(grid) check if game has not been won', () => {
    const gridState = [
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_O, CELL_VALUES.CELL_x],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X]
    ];

    const returnedResult = checkIfGameIsTiedAndNotWon(gridState);

    expect(returnedResult).toEqual(false);
  });
});

describe('getCurrentGameStateMessage(...)', () => {
  test('getCurrentGameStateMessage(GAME_STATE.PLAYER_WON, PLAYER.O) returns that the player O has won', () => {
    const message = getCurrentGameStateMessage(GAME_STATE.PLAYER_WON, PLAYER.O);

    expect(message).toEqual(`The player '${PLAYER.O}' WON`);
  });

  test('getCurrentGameStateMessage(GAME_STATE.TIE, PLAYER.X) returns that the game is tied and it needs to be restarted', () => {
    const message = getCurrentGameStateMessage(GAME_STATE.TIE, PLAYER.X);

    expect(message).toEqual('The game is TIED, please restart');
  });

  test('getCurrentGameStateMessage(GAME_STATE.PLAYING, PLAYER.X) returns that the game is being played and it is player X turn', () => {
    const message = getCurrentGameStateMessage(GAME_STATE.PLAYING, PLAYER.X);

    expect(message).toEqual(`The current player is '${PLAYER.X}'`);
  });
});

describe('calculateNewGameState(...)', () => {
  test('calculateNewGameState(GAME_STATE.PLAYING, grid, PLAYER.X, 0, 0) Game is tied, do not allow any change to game state', () => {
    const testGrid = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X]
    ];

    const result = calculateNewGameState(GAME_STATE.PLAYING, testGrid, PLAYER.X, 0, 0);
    
    expect(result).toEqual(null);
  });

  test('calculateNewGameState(GAME_STATE.PLAYING, grid, PLAYER.X, 0, 0) Game has been won by player X, do not allow any change to game state', () => {
    // Player X won using diagonal from bottom left to top right
    const testGrid = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_O]
    ];

    const result = calculateNewGameState(GAME_STATE.PLAYING, testGrid, PLAYER.X, 0, 0);
    
    expect(result).toEqual(null);
  });

  test('calculateNewGameState(GAME_STATE.PLAYING, grid, PLAYER.X, 0, 0) to correctly simulate new game first click on (0,0)', () => {
    const testGrid = [
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
    ];
    
    const expectedResult = {
      grid: [
        [CELL_VALUES.CELL_X, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
      ],
      currentPlayer: PLAYER.O
    };

    const result = calculateNewGameState(GAME_STATE.PLAYING, testGrid, PLAYER.X, 0, 0);
    
    expect(result).toEqual(expectedResult);
  });
  
  test('calculateNewGameState(GAME_STATE.PLAYING, grid, PLAYER.X, 0, 0) Player X has won', () => {
    const testGrid = [
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_O]
    ];
    
    const expectedResult = {
      grid: [
        [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
        [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O],
        [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_O]
      ],
      gameState: GAME_STATE.PLAYER_WON
    };

    const result = calculateNewGameState(GAME_STATE.PLAYING, testGrid, PLAYER.X, 0, 0);
    
    expect(result).toEqual(expectedResult);
  });

  test('calculateNewGameState(GAME_STATE.PLAYING, grid, PLAYER.X, 0, 0) Game has been tied', () => {
    const testGrid = [
      [CELL_VALUES.EMPTY, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O]
    ];

    const expectedResult = {
      grid: [
        [CELL_VALUES.CELL_X, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
        [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
        [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O]
      ],
      gameState: GAME_STATE.TIE
    };

    const result = calculateNewGameState(GAME_STATE.PLAYING, testGrid, PLAYER.X, 0, 0);
    
    expect(result).toEqual(expectedResult);
  });
});
