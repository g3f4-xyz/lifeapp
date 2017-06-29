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

  onZoom = (id) => {
    const { offset } = this.props.modules.find(module => module.id === id);

    if (offset && this.props.onModuleChange) {
      this.props.onModuleChange(offset);
      this.setState({ gridViewMode: false });
    }
  };

  getTiles() {
    const { modules, viewPortOffset } = this.props;

    return this.state.gridViewMode ? modules.sort(sortModules) : modules.reduce((result, module) => {
      if (shallowequal(module.offset, viewPortOffset)) {
        return [
          module,
          ...result,
        ];
      }

      return [
        ...result,
        module,
      ];
    }, []);
  }

  render() {
    const { size = DEFAULT_SIZE, viewPortOffset, onModuleChange, handlers } = this.props;
    const { gridViewMode } = this.state;
    const cellHeight = gridViewMode ?
      (this.state.innerHeight / size.columns) - 26 / size.columns
      : this.state.innerHeight - 18;
    const cols = gridViewMode ? size.columns : 1;

    return (
      <div>
        {!gridViewMode && (
          <IconButton
            style={{ position: 'absolute', right: 10, opacity: 0.5 }}
            onClick={() => this.setState({ gridViewMode: !this.state.gridViewMode })}
          >
            <ViewModuleIcon />
          </IconButton>
        )}
        <DirectionsButtons gridSize={size} onDirectionClick={onModuleChange} viewPortOffset={viewPortOffset} />
        <GridList
          cellHeight={cellHeight}
          cols={cols}
        >
        {this.getTiles().map(({ Component, id, offset }, key) => (
          <GridTile
            containerElement={<PaperForGridTile zDepth={3} />}
            key={id}
            onMouseEnter={() => {
              this.setState({ hovered: id });
            }}
            onMouseLeave={() => {
              this.setState({ hovered: null });
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
            <Module style={{ zoom: gridViewMode ? 1 / DEFAULT_SIZE.columns : 1 }}>
              <Component {...(handlers[id] ? handlers[id]() : {})} />
            </Module>
          </GridTile>
        ))}
        </GridList>
      </div>
    );
  }
}
