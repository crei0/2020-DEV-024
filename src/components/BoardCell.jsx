import React from 'react';
import PropTypes from 'prop-types';

import { CELL_VALUES } from '../enums/board';

/**
 * Board's cell
 */
class BoardCell extends React.Component {
  handleClick = () => {
    const {
      x,
      y
    } = this.props;

    this.props.clickHandler(x, y);
  }
  
  render() {
    const { value } = this.props;

    return (
      <div className="col-sm tic-tac-toe__board-cell">
        <button 
          onClick={this.handleClick}
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
  value: PropTypes.string,

  /**
   * Function called when the cell is clicked
   */
  clickHandler: PropTypes.func
};

export default BoardCell;