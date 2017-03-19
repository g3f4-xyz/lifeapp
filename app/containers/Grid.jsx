import React from 'react';
import shallowequal from 'shallowequal';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import Module from './Module';
import DirectionsButtons from './DirectionsButtons';
import PaperForGridTile from '../components/PaperForGridTile';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
};

const styles = {
  gridView: {
    module: {
      textAlign: 'center',
      padding: '10px',
      overflow: 'hidden',
      display: 'inline-flex',
    },
  },
  singleModule: {
    module: {
      height: '90vh',
      textAlign: 'center',
      padding: '10px',
      margin: '10px',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
    margin: 15,
  },
  gridTile: {
    // width: '95%',
    // height: '95%'
  },
};

export default class Grid extends React.Component {
  static propTypes = {
    modules: React.PropTypes.array,
    size: React.PropTypes.object,
    viewPortOffset: React.PropTypes.object,
    onDirection: React.PropTypes.func,
  };

  state = {
    gridViewMode: false,
  };

  componentDidMount() {
    this.setState({ rootHeight: window.innerHeight - 60 });
  }
  
  renderGridView = (modules, size) => {
    return (
      <div style={styles.root} >
        <GridList
          cellHeight={this.state.rootHeight / size.columns}
          cols={size.columns}
          style={styles.gridList}
        >
        {modules.map(({ node }, key) => (
          <GridTile
            style={styles.gridTile}
            containerElement={<PaperForGridTile zDepth={3} />}
            key={key}
          >
            <Module style={styles.gridView.module}>{node}</Module>
          </GridTile>
        ))}
        </GridList>
      </div>
    );
  };

  render() {
    const { modules, size = DEFAULT_SIZE, viewPortOffset } = this.props;

    return (
      <div>
        <FlatButton
          label="Grid switch"
          style={{ position: 'absolute', left: '85%' }}
          onClick={() => this.setState({ gridViewMode: !this.state.gridViewMode })}
        />
        {this.state.gridViewMode ?
          this.renderGridView(modules, size)
          :
          this.renderGridView([modules.find(module => shallowequal(viewPortOffset, module.offset))], { columns: 1, rows: 1 })}
      </div>
    );
  }
}
