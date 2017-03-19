import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Module from './Module';
import DirectionsButtons from './DirectionsButtons';
import shallowequal from 'shallowequal';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
};

const styles = {
  gridView: {
    module: {
      height: '200px',
      width: '300px',
      textAlign: 'center',
      padding: '10px',
      margin: '10px',
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

  renderSingleModule() {
    const { modules, viewPortOffset, onDirection, size = DEFAULT_SIZE } = this.props;
    const module = modules.find((module) => shallowequal(module.offset, viewPortOffset));

    return module ? (
      <div>
        <DirectionsButtons gridSize={size} onDirectionClick={onDirection} viewPortOffset={viewPortOffset} />
        <Module style={styles.singleModule.module}>{module.node}</Module>
      </div>
    ) : null;
  }

  renderGridView = () => {
    const { size = DEFAULT_SIZE, modules } = this.props;
    const { columns, rows } = size;
    const rowsIndexes = Array.from({ length: rows }, (_, index) => index);
    const columnsIndexes = Array.from({ length: columns }, (_, index) => index);

    return rowsIndexes.map(rowOffset => (
      <div key={rowOffset}>
        {columnsIndexes.map(columnOffset => {
          const module = modules.find((module) => module.offset.column === columnOffset && module.offset.row === rowOffset);

          return module ? <Module style={styles.gridView.module} key={columnOffset}>{module.node}</Module> : null;
        })}
      </div>
    ));
  };

  render() {
    return (
      <div>
        <FlatButton
          label="Grid switch"
          style={{ position: 'absolute', left: '85%' }}
          onClick={() => this.setState({ gridViewMode: !this.state.gridViewMode })}
        />
        {this.state.gridViewMode ? this.renderGridView() : this.renderSingleModule()}
      </div>
    );
  }
}
