import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import DirectionButton from '../components/DirectionButton';

const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

export default class DirectionsButtons extends React.Component {
  static propTypes = {
    gridSize: PropTypes.object,
    viewPortOffset: PropTypes.object,
    onDirectionClick: PropTypes.func,
  };

  state = {
    open: false,
  };

  isDirectionAble = (direction) => {
    if (direction === DIRECTIONS.LEFT) {
      return this.props.viewPortOffset.column > 0;
    } else if (direction === DIRECTIONS.RIGHT) {
      return this.props.viewPortOffset.column + 1 < this.props.gridSize.columns;
    } else if (direction === DIRECTIONS.UP) {
      return this.props.viewPortOffset.row > 0;
    } else if (direction === DIRECTIONS.DOWN) {
      return this.props.viewPortOffset.row + 1 < this.props.gridSize.rows;
    }

    console.error(`Provide proper direction. Able directions: ${Object.keys(DIRECTIONS).map(key => DIRECTIONS[key])}`);

    return false;
  };

  handleDirectionChange = (direction) => {
    const { row, column } = this.props.viewPortOffset;
    const calculateColumns = (direction) => {
      if (direction === DIRECTIONS.UP || direction === DIRECTIONS.DOWN) {
        return column;
      }
      if (direction === DIRECTIONS.LEFT) {
        return this.isDirectionAble(direction) ? column - 1 : column;
      }
      if (direction === DIRECTIONS.RIGHT) {
        return this.isDirectionAble(direction) ? column + 1 : column;
      }
    };
    const calculateRows = (direction) => {
      if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
        return row;
      }
      if (direction === DIRECTIONS.UP) {
        return this.isDirectionAble(direction) ? row - 1 : row;
      }
      if (direction === DIRECTIONS.DOWN) {
        return this.isDirectionAble(direction) ? row + 1 : row;
      }
    };
    this.props.onDirectionClick({
      column: calculateColumns(direction),
      row: calculateRows(direction),
    });
    this.setState({ open: true });
  };

  handleClose = () => this.setState({
    open: false,
  });

  render() {
    return [
      <Snackbar
        key="DirectionsButtons:Snackbar"
        open={this.state.open}
        autoHideDuration={1000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{`viewPort offset: ${JSON.stringify(this.props.viewPortOffset)}`}</span>}
      />,
      Object.keys(DIRECTIONS).map(key => (
        <DirectionButton
          key={DIRECTIONS[key]}
          display={this.isDirectionAble(DIRECTIONS[key])}
          direction={DIRECTIONS[key]}
          onClick={this.handleDirectionChange}
        />
      ))
    ];
  }
}
