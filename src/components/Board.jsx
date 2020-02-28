import React from 'react';

import { PLAYER, GAME_STATE } from '../enums/board';

class Board extends React.Component {
  state = {
    grid: [],
    currentPlayer: PLAYER.X,
    gameState: GAME_STATE.PLAYING
  };

  render() {
    return (
      <div>
        Board renders here
      </div>
    );
  }
}

export default Board;