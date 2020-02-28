import { CELL_VALUES, PLAYER, GAME_STATE } from '../enums/board';

import { resetGridState, checkIfPlayerWon } from './board.js'

describe('board.js', () => {
  it('resetGridState() returns an empty grid state', () => {
    const expectedResult = {
      grid: [
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY],
        [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.EMPTY]
      ],
      currentPlayer: PLAYER.X,
      gameState: GAME_STATE.PLAYING
    };

    expect(resetGridState()).toStrictEqual(expectedResult)
  });

  it('checkIfPlayerWon(grid) detects that one player has won', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X]
    ];
    
    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(true);
  });
});
