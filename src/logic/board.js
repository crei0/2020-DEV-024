import { CELL_VALUES, PLAYER, GAME_STATE } from '../enums/board';

/**
 * Resets the grid and makes player X the current player
 * 
 * @returns {Object} The re-initialized grid state
 */
export const resetGridState = () => (
  {
    grid: [
      [CELL_VALUES.EMPTY,  CELL_VALUES.EMPTY,   CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY,  CELL_VALUES.EMPTY,   CELL_VALUES.EMPTY],
      [CELL_VALUES.EMPTY,  CELL_VALUES.EMPTY,   CELL_VALUES.EMPTY]
    ],
    currentPlayer: PLAYER.X,
    gameState: GAME_STATE.PLAYING
  }
);