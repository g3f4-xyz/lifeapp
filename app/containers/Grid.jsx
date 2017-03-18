import React from 'react';
import Module from './Module';
import DirectionsButtons from './DirectionsButtons';
import shallowequal from 'shallowequal';

const DEFAULT_SIZE = {
  columns: 3,
  rows: 3,
};

export default class Grid extends React.Component {
  static propTypes = {
    modules: React.PropTypes.array,
    size: React.PropTypes.object,
    viewPortOffset: React.PropTypes.object,
    onDirection: React.PropTypes.func,
  };

  render() {
    const { size = DEFAULT_SIZE, modules, viewPortOffset, onDirection } = this.props;
    const { columns, rows } = size;

    return (
      <div>
        <DirectionsButtons gridSize={size} onDirectionClick={onDirection} viewPortOffset={viewPortOffset} />
        {Array.from({ length: rows }, (_, index) => index).map(rowOffset => (
          <div key={rowOffset}>
            {Array.from({length: columns}, (_, index) => index).map(columnOffset => {
              const module = modules.find((module) => module.offset.column === columnOffset && module.offset.row === rowOffset);

              return module && shallowequal(viewPortOffset, module.offset) ? (
                <Module key={columnOffset}>{module.node}</Module>
              ) : null;
            })}
          </div>
        ))}
      </div>
    );
  }
}
