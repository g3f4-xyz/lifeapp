import React from 'react';
import shallowequal from 'shallowequal';
import IconButton from 'material-ui/IconButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Module from './Module';
import DirectionsButtons from './DirectionsButtons';
import PaperForGridTile from '../components/PaperForGridTile';
import RaisedButtonForGridTile from '../components/RaisedButtonForGridTile';
import ViewModuleIcon from 'material-ui/svg-icons/action/view-module';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
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

  onModuleChange = (offset) => {
    if (this.props.onModuleChange) {
      this.props.onModuleChange(offset);
    }
    this.setState({ gridViewMode: false });
  };

  render() {
    const { size = DEFAULT_SIZE, viewPortOffset, onModuleChange } = this.props;
    const { gridViewMode } = this.state;
    const modules = gridViewMode ? this.props.modules : [this.props.modules.find(module => shallowequal(module.offset, viewPortOffset))];
    const cellHeight = gridViewMode ?
      (this.state.innerHeight / size.columns) - 26 / size.columns
      : this.state.innerHeight - 18;
    const cols = gridViewMode ? size.columns : 1;
    const containerElement = gridViewMode ? <RaisedButtonForGridTile /> : <PaperForGridTile zDepth={3} />;

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
        {modules.map(({ node, offset }, key) => (
          <GridTile
            containerElement={containerElement}
            key={key}
            onClick={() => this.onModuleChange(offset)}
          >
            <Module style={{ zoom: gridViewMode ? 0.5 : 1 }}>{node}</Module>
          </GridTile>
        ))}
        </GridList>
      </div>
    );
  }
}
