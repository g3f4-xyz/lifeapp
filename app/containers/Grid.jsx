// Wynieść Grid od oddzielnego repozytorium i udostępnić na npm
import React from 'react';
import shallowequal from 'shallowequal';
import IconButton from 'material-ui/IconButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Module from './Module';
import DirectionsButtons from './DirectionsButtons';
import PaperForGridTile from '../components/PaperForGridTile';
import ViewModuleIcon from 'material-ui/svg-icons/action/view-module';
import ZoomIcon from 'material-ui/svg-icons/maps/zoom-out-map';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
};

const sortModules = (current, next) => {
  const { offset: { column: currentColumn, row: currentRow } } = current;
  const { offset: { column: nextColumn, row: nextRow } } = next;

  if (currentRow !== nextRow) {
    return currentRow > nextRow;
  }

  return currentColumn > nextColumn ;
};

export default class Grid extends React.Component {
  static propTypes = {
    modules: React.PropTypes.array,
    size: React.PropTypes.object,
    viewPortOffset: React.PropTypes.object,
    onModuleChange: React.PropTypes.func,
  };

  state = {
    gridViewMode: false,
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  };

  componentDidMount() {
    window.onresize = (e) => {
      const { innerHeight, innerWidth } = e.target;
      this.setState({ innerHeight, innerWidth });
    };
  }

  getDynamicSize(count) {
    const countSqrt = Math.sqrt(count);
    const horizontal = this.state.innerWidth > this.state.innerHeight;
    const gridSize = countSqrt % 1 === 0 ? countSqrt : parseInt(countSqrt) + 1;
    const freeTiles = Math.pow(gridSize, 2) - count;
    const isEmptyLine = freeTiles >= gridSize;
    const size = isEmptyLine ? {
      columns: !horizontal ? gridSize : gridSize - 1,
      rows: horizontal ? gridSize : gridSize - 1,
    } : {
      columns: gridSize,
      rows: gridSize,
    };

    return size;
  }

  onZoom = id => {
    const { offset } = this.props.modules.find(module => module.id === id);

    if (offset) {
      this.onModuleChange(offset);
      this.setState({ gridViewMode: false });
    }
  };

  onModuleChange = offset => {
    if (this.props.onModuleChange) {
      this.props.onModuleChange(offset);
    }
  };

  getTiles() {
    const { modules, viewPortOffset, visited } = this.props;

    return (this.state.gridViewMode ? modules.sort(sortModules) : modules.reduce((result, module) => {
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

  render() {
    const { viewPortOffset, handlers, dynamic } = this.props;
    const tiles = this.getTiles();
    const size = dynamic ? this.getDynamicSize(tiles.length) : this.props.size || DEFAULT_SIZE;
    const { gridViewMode } = this.state;
    const cellHeight = gridViewMode ?
      (this.state.innerHeight / size.columns) - 26 / size.columns
      : this.state.innerHeight - 18;
    const cols = gridViewMode ? size.rows : 1;

    return (
      <div>
        {!gridViewMode && tiles.length > 1 && (
          <IconButton
            style={{ position: 'absolute', right: 10, opacity: 0.5 }}
            onClick={() => this.setState({ gridViewMode: !this.state.gridViewMode })}
          >
            <ViewModuleIcon />
          </IconButton>
        )}
        {!gridViewMode && tiles.length > 1 && (
          <DirectionsButtons gridSize={DEFAULT_SIZE} onDirectionClick={this.onModuleChange} viewPortOffset={viewPortOffset} />
        )}
        <GridList
          cellHeight={cellHeight}
          cols={cols}
        >
        {tiles.map(({ Component, id, offset, inViewPort }, key) => console.log(['inViewPort'], inViewPort) || (
          <GridTile
            style={{ display: !gridViewMode && !inViewPort ? 'none' : 'block' }}
            containerElement={<PaperForGridTile zDepth={3} />}
            key={id}
            onMouseEnter={() => {
              if (gridViewMode) {
                this.setState({ hovered: id });
              }
            }}
            onMouseLeave={() => {
              if (gridViewMode) {
               this.setState({ hovered: null });
              }
            }}
          >
            <ZoomIcon
              style={{
                display: gridViewMode && id === this.state.hovered ? 'block' : 'none',
                bottom: 0,
                right: 0,
                width: '25%',
                height: '25%',
                position: 'absolute',
                zIndex: 9
              }}
              onClick={() => this.onZoom(id)}
            />
            <Module style={{ zoom: gridViewMode ? 1 / size.columns : 1 }}>
              <Component {...(handlers[id] ? handlers[id]() : {})} />
            </Module>
          </GridTile>
        ))}
        </GridList>
      </div>
    );
  }
}
