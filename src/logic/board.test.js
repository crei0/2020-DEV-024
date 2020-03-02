import { CELL_VALUES, PLAYER, GAME_STATE } from '../enums/board';

import {
  resetGridState,
  checkIfPlayerWon,
  checkIfGameIsTied,
  getCurrentGameStateMessage
} from './board.js';

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

  it('checkIfPlayerWon(grid) detects that no one has won', () => {
    const gridState = [
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_O],
      [CELL_VALUES.EMPTY, CELL_VALUES.EMPTY, CELL_VALUES.CELL_X]
    ];

    const returnedResult = checkIfPlayerWon(gridState);

    expect(returnedResult).toEqual(false);
  });

  it('checkIfGameIsTied(grid) detects the game is tied', () => {
    const gridState = [
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_X, CELL_VALUES.CELL_X],
      [CELL_VALUES.CELL_X, CELL_VALUES.CELL_X, CELL_VALUES.CELL_O],
      [CELL_VALUES.CELL_O, CELL_VALUES.CELL_O, CELL_VALUES.CELL_X]
    ];

    const returnedResult = checkIfGameIsTied(gridState);

    expect(returnedResult).toEqual(true);
  });

  it('getCurrentGameStateMessage(GAME_STATE.PLAYER_WON, PLAYER.O) returns that the player O has won', () => {
    const message = getCurrentGameStateMessage(GAME_STATE.PLAYER_WON, PLAYER.O);

    expect(message).toEqual(`The player '${PLAYER.O}' WON`);
  });

  it('getCurrentGameStateMessage(GAME_STATE.TIE, PLAYER.X) returns that the game is tied and it needs to be restarted', () => {
    const message = getCurrentGameStateMessage(GAME_STATE.TIE, PLAYER.X);

    expect(message).toEqual('The game is TIED, please restart');
  });

  it('getCurrentGameStateMessage(GAME_STATE.PLAYING, PLAYER.X) returns that the game is being played and it is player X turn', () => {
    const message = getCurrentGameStateMessage(GAME_STATE.PLAYING, PLAYER.X);

    expect(message).toEqual(`The current player is '${PLAYER.X}'`);
  });
});
