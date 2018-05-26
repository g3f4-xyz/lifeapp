// Wynieść Grid od oddzielnego repozytorium i udostępnić na npm
import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Module from './Module';
import DirectionsButtons from './DirectionsButtons';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ZoomIcon from '@material-ui/icons/ZoomOutMap';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
};
const DEFAULT_VIEW_PORT_OFFSET = {
  column: 1,
  row: 1,
};
const sortModules = (current, next) => {
  const { offset: { column: currentColumn, row: currentRow } } = current;
  const { offset: { column: nextColumn, row: nextRow } } = next;

  if (currentRow !== nextRow) {
    return currentRow > nextRow;
  }

  return currentColumn > nextColumn ;
};

const styles = theme => ({
  gridList: {
    width: '100%',
    height: '100%',
  },
});

class Grid extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    modules: PropTypes.array.isRequired,
    size: PropTypes.object,
    dynamic: PropTypes.bool,
    showGrid: PropTypes.bool,
    viewPortOffset: PropTypes.object,
    onModuleChange: PropTypes.func,
  };

  state = {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  };

  componentDidMount() {
    window.onresize = (e) => {
      const { innerHeight, innerWidth } = e.target;
      this.setState({ innerHeight, innerWidth });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visited.length === 1) {
      if (!shallowequal(nextProps.viewPortOffset, DEFAULT_VIEW_PORT_OFFSET)) {
        this.onModuleChange(DEFAULT_VIEW_PORT_OFFSET);
      }
    }
  }

  getDynamicSize(count) {
    const countSqrt = Math.sqrt(count);
    const horizontal = this.state.innerWidth > this.state.innerHeight;
    const gridSize = countSqrt % 1 === 0 ? countSqrt : parseInt(countSqrt, 10) + 1;
    const freeTiles = Math.pow(gridSize, 2) - count;
    const isEmptyLine = freeTiles >= gridSize;

    return isEmptyLine ? {
      columns: !horizontal ? gridSize : gridSize - 1,
      rows: horizontal ? gridSize : gridSize - 1,
    } : {
      columns: gridSize,
      rows: gridSize,
    };
  }

  onZoom = id => {
    const { offset } = this.props.modules.find(module => module.id === id);

    if (offset) {
      this.onModuleChange(offset);
    }
  };

  onModuleChange = offset => {
    if (this.props.onModuleChange) {
      this.props.onModuleChange(offset);
    }
  };

  onModuleClose = moduleId => {
    if (this.props.onModuleClose) {
      this.props.onModuleClose(moduleId);
    }
  };

  getTiles() {
    const { modules, viewPortOffset, visited } = this.props;

    return (this.props.showGrid ? modules.sort(sortModules) : modules.reduce((result, module) => {
      if (shallowequal(module.offset, viewPortOffset)) {
        return [
          {
            ...module,
            inViewPort: true,
          },
          ...result,
        ];
      }

      return [
        ...result,
        module,
      ];
    }, [])).filter(({ id }) => visited.includes(id));
  }

  getTileProps({ id: moduleId, inViewPort }) {
    return {
      key: moduleId,
      style: { display: !this.props.showGrid && !inViewPort ? 'none' : 'block' },
      component: Paper,
      onMouseEnter: () => {
        if (this.props.showGrid) {
          this.setState({ hoveredModuleId: moduleId });
        }
      },
      onMouseLeave: () => {
        if (this.props.showGrid) {
          this.setState({ hoveredModuleId: null });
        }
      },
    };
  }

  renderGridControls() {
    const { viewPortOffset } = this.props;

    return [
      <DirectionsButtons
        key="renderGridControls:DirectionsButtons"
        gridSize={DEFAULT_SIZE}
        onDirectionClick={this.onModuleChange}
        viewPortOffset={viewPortOffset}
      />,
    ];
  }

  renderCloseButton(moduleId, locked) {
    const { hoveredModuleId } = this.state;

    return this.props.showGrid && !locked && (
      <IconButton
        style={{
          display: this.props.showGrid && moduleId === hoveredModuleId ? 'block' : 'none',
          minWidth: 40,
          opacity: 0.5,
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 9,
        }}
        onClick={() => this.onModuleClose(moduleId)}
      >
        <ClearIcon />
      </IconButton>
    );
  }

  renderZoomButton(moduleId) {
    const { hoveredModuleId } = this.state;

    return (
      <IconButton
        style={{
          display: this.props.showGrid && moduleId === hoveredModuleId ? 'block' : 'none',
          bottom: 0,
          right: 0,
          position: 'absolute',
          zIndex: 9,
        }}
        onClick={() => this.onZoom(moduleId)}
      >
        <ZoomIcon />
      </IconButton>
    );
  }

  render() {
    const { classes, dynamic, showGrid } = this.props;
    const tiles = this.getTiles();
    const size = dynamic ? this.getDynamicSize(tiles.length) : this.props.size || DEFAULT_SIZE;
    const cellHeight = showGrid ?
      (this.state.innerHeight / size.columns) - 26 / size.columns
      : this.state.innerHeight - 18;
    const cols = showGrid ? size.rows : 1;

    return [
      <GridList
        key="Grid:GridList"
        cellHeight={cellHeight}
        cols={cols}
        className={classes.gridList}
      >
        {tiles.map(({ node, id, offset, inViewPort, locked }, key) => (
          <GridListTile {...this.getTileProps({ id, inViewPort })} key={key}>
            {this.renderCloseButton(id, locked)}
            {this.renderZoomButton(id)}
            {!showGrid && this.renderGridControls()}
            <Module style={{ zoom: showGrid ? 1 / size.columns : 1 }}>{node}</Module>
          </GridListTile>
        ))}
      </GridList>,
    ];
  }
}

export default withStyles(styles)(Grid);
