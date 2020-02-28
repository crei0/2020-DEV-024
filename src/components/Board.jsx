import React from 'react';

import { PLAYER, GAME_STATE } from '../enums/board';
import { resetGridState } from '../logic/board.js';

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

  render() {
    const {
      currentPlayer,
      gameState
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
        <span className="container-fluid">
          { message }
        </span>

        Board renders here
      </div>
    );
  }
}

export default Board;