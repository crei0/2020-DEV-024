import { CELL_VALUES, PLAYER, GAME_STATE } from '../enums/board';

import { resetGridState } from './board.js'

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
});
