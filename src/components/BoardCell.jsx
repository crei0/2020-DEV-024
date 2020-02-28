import React from 'react';
import PropTypes from 'prop-types';

import { CELL_VALUES } from '../enums/board';

/**
 * Board's cell
 */
class BoardCell extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <div className="col-sm tic-tac-toe__board-cell">
        <button 
          disabled={value !== CELL_VALUES.EMPTY}
          type="button"
          className="btn btn-info btn-lg btn-block">
          {value}
        </button>
      </div>
    );
  }
}

BoardCell.propTypes = {
  /**
   * The X-axis (horizontal) position
   */
  x: PropTypes.number,

  /**
   * The Y-axis (vertical) position
   */
  y: PropTypes.number,
  
  /**
   * Can be "-" (empty), 'X', 'O'
   */
  value: PropTypes.string
};

export default BoardCell;