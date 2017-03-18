import React from 'react';
import Relay from 'react-relay';
import Snackbar from 'material-ui/Snackbar';
import Home from '../modules/Home';
import Grid from './Grid';
import DirectionButton from '../components/DirectionButton';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
};

const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.shape({
      home: React.PropTypes.object,
    }),
  };

  state = {
    isSnackbarOpen: false,
    viewPortOffset: {
      column: 1,
      row: 1,
    },
    size: DEFAULT_SIZE,
  };

  isDirectionAble = (direction) => {
    if (direction === DIRECTIONS.LEFT) {
      return this.state.viewPortOffset.column > 0;
    } else if (direction === DIRECTIONS.RIGHT) {
      return this.state.viewPortOffset.column + 1 < this.state.size.columns;
    } else if (direction === DIRECTIONS.UP) {
      return this.state.viewPortOffset.row > 0;
    } else if (direction === DIRECTIONS.DOWN) {
      return this.state.viewPortOffset.row + 1 < this.state.size.rows;
    }

    console.error(`Provide proper direction. Able directions: ${Object.keys(DIRECTIONS).map(key => DIRECTIONS[key])}`);

    return false;
  };

  handleDirectionChange = (direction) => {
    const { row, column } = this.state.viewPortOffset;
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
    this.setState({
      isSnackbarOpen: true,
      viewPortOffset: {
        column: calculateColumns(direction),
        row: calculateRows(direction),
      },
    });
  };

  handleSnackbarClose = () => this.setState({
    isSnackbarOpen: false,
  });

  render() {
    const modules = [
      {
        desc: 'Home module',
        node: <Home home={this.props.app.home} />,
        offset: {
          column: 1,
          row: 1,
        },
      },
    ];
    const size = this.state.size || DEFAULT_SIZE;
    const { viewPortOffset } = this.state;

    return (
      <div>
        <Snackbar
          open={this.state.isSnackbarOpen}
          message={`viewPort offset: ${JSON.stringify(viewPortOffset)}`}
          autoHideDuration={1000}
          onRequestClose={this.handleSnackbarClose}
        />
        {Object.keys(DIRECTIONS).map(key => (
          <DirectionButton
            key={DIRECTIONS[key]}
            display={this.isDirectionAble(DIRECTIONS[key])}
            direction={DIRECTIONS[key]}
            onClick={this.handleDirectionChange}
          />
        ))}
        <Grid
          size= {size}
          modules={modules}
          viewPortOffset={viewPortOffset}
        />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        home {
          ${Home.getFragment('home')},
        }
      }
    `,
  },
});
