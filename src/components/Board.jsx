import React from 'react';

import { PLAYER, GAME_STATE, CELL_VALUES } from '../enums/board';
import { resetGridState, checkIfPlayerWon, checkIfGameIsTied } from '../logic/board';
import BoardCell from '../components/BoardCell';

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
      resetGridState()
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
        } else if (checkIfGameIsTied(grid)) {
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

    let message = '';
    switch (gameState) {
      case GAME_STATE.PLAYER_WON:
        message = `The player '${currentPlayer}' WON`;
        break;

      case GAME_STATE.TIE:
        message = 'The game is TIED, please restart';
        break;

      default:
        message = `The current player is '${currentPlayer}'`;
        break;
    }

    return (
      <div>
        <div className="container-fluid">
          { message }
        </div>

        <div className="container">
          { this.renderBoardStructure(grid) }
        </div>
      </div>
    );
  }
}

export default Board;