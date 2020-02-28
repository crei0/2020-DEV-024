import React from 'react';

import { PLAYER, GAME_STATE } from '../enums/board';
import { resetGridState } from '../logic/board.js';
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
              value={value}
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