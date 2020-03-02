import React from 'react';

import { PLAYER, GAME_STATE, CELL_VALUES } from '../enums/board';
import BoardCell from '../components/BoardCell';

/**
 * Resets the grid cell values, makes player 'X' the current player, and changes the game state to be playing
 * 
 * @returns {Object} The re-initialized grid state
 */
export const getInitialBoardState = () => (
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

/**
 * Checks if the three cells (passed as arguments) are all the same
 * 
 * @param {String} cell1 The first cell to be checked
 * @param {String} cell2 The second cell to be checked
 * @param {String} cell3 The last cell to be checked
 * @returns {Boolean}
 */
const _checkThreeCells = (cell1, cell2, cell3) => {
  return cell1 === cell2 &&
         cell1 === cell3 &&
         cell1 !== CELL_VALUES.EMPTY;
};

/**
 * Checks if a player won, 
 * first checks by row,
 * then by column,
 * then diagonal top-left to bottom-right
 * lastly diagonal bottom-left to top-right
 * 
 * @param {Array} grid The grid array
 * @returns {Boolean}
 */
export const checkIfPlayerWon = (grid) => {
  for (let index = 0; index < 3; index++) {
    // Rows
    if (_checkThreeCells(grid[index][0], grid[index][1], grid[index][2])) {
      return true;
    };

    // Columnns
    if (_checkThreeCells(grid[0][index], grid[1][index], grid[2][index])) {
      return true;
    };
  }

  // diagonal top-left to bottom-right
  if (_checkThreeCells(grid[0][0], grid[1][1], grid[2][2])) {
    return true;
  }

  // diagonal bottom-left to top-right
  if (_checkThreeCells(grid[2][0], grid[1][1], grid[0][2])) {
    return true;
  }

  return false;
};

/**
 * Checks if there's an empty cell
 * 
 * @param {Array} grid The Grid's array
 * @returns {Boolean}
 */
const _checkIfThereIsStillAnEmptyCell = (grid) => {
  // Flatten and convert to String, then check if there's an empty cell
  return grid
    .flat(2)
    .toString()
    .indexOf(CELL_VALUES.EMPTY) === -1;
};

/**
 * Checks if the game is Tied (and not won by a player at the same time)
 * 
 * @param {Array} grid The Grid's array
 * @returns {Boolean}
 */
export const checkIfGameIsTiedAndNotWon = (grid) => {
  return !checkIfPlayerWon(grid) && _checkIfThereIsStillAnEmptyCell(grid);
};

/**
 * Returns the current game state message that should appear on the top of the board,
 * saying that the game is in Play, is Tied, or a certain player has won it
 * 
 * @param {(GAME_STATE|String)} gameState The current game State (GAME_STATE)
 * @param {(PLAYER|String)} currentPlayer The currently player that is on his/her turn (PLAYER)
 * @returns {Boolean} The game state message
 */
export const getCurrentGameStateMessage = (gameState, currentPlayer) => {
  switch (gameState) {
    case GAME_STATE.PLAYER_WON:
      return `The player '${currentPlayer}' WON`;

    case GAME_STATE.TIE:
      return 'The game is TIED, please restart';

    default:
      return `The current player is '${currentPlayer}'`;
  }
};

class Board extends React.Component {
  state = {
    grid: [],
    currentPlayer: PLAYER.X,
    gameState: GAME_STATE.PLAYING
  };

  componentDidMount() {
    this.resetGrid();
  }

  /**
   * Resets the grid state
   */
  resetGrid = () => {
    this.setState(
      getInitialBoardState()
    );
  }

    /**
   * Handles the clicks on the cells, and updates the state
   * 
   * @param {Number} x The x-axis position for the clicked cell
   * @param {Number} y The y-axis position for the clicked cell
   */
  handleCellClick = (x, y) => {
    const {
      grid,
      currentPlayer,
      gameState
    } = this.state;
    
    if (gameState === GAME_STATE.PLAYING) {
      if (grid[y][x] === CELL_VALUES.EMPTY) {
        grid[y][x] = currentPlayer;
  
        if (checkIfPlayerWon(grid)) {
          this.setState({
            grid: grid,
            gameState: GAME_STATE.PLAYER_WON
          });
        } else if (checkIfGameIsTiedAndNotWon(grid)) {
          this.setState({
            grid: grid,
            gameState: GAME_STATE.TIE
          });
        } else {
          this.setState({
            grid: grid,
            currentPlayer: currentPlayer === PLAYER.X ? PLAYER.O : PLAYER.X
          });
        }
      }
    }
  };

  /**
   * Just renders the Board structure
   * 
   * @param {Array} grid The Grid's array
   */
  renderBoardStructure = (grid) => {
    return grid.map((row, rowIndex) =>
      <div className="row" key={`row-${rowIndex}`}>
        { row.map((value, columnIndex) =>
          <div key={`cell-${rowIndex}-${columnIndex}`}>
            <BoardCell
              y={rowIndex}
              x={columnIndex}
              value={value}
              clickHandler={this.handleCellClick}
            />
          </div>
        )}
      </div>
    )
  };

  render() {
    const {
      currentPlayer,
      gameState,
      grid
    } = this.state;

    return (
      <div>
        <div className="container-fluid">
          { getCurrentGameStateMessage(gameState, currentPlayer) }
        </div>

        <div className="container">
          { this.renderBoardStructure(grid) }
        </div>
      </div>
    );
  }
}

export default Board;