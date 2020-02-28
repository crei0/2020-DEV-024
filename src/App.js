import React from 'react';

import Board from './components/Board';

function App() {
  return (
    <div className="tic-tac-toe">
      <header className="tic-tac__toeheader">
        <h1>
          Tic-tac-toe
        </h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
