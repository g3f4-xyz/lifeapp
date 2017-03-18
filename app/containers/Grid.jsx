import React from 'react';
import Module from './Module';
import shallowequal from 'shallowequal';

export default class Grid extends React.Component {
  static propTypes = {
    modules: React.PropTypes.array,
    size: React.PropTypes.object,
    viewPortOffset: React.PropTypes.object,
  };

  render() {
    const { size, modules, viewPortOffset } = this.props;
    const { columns, rows } = size;

    return (
      <div>
        {Array.from({ length: rows }, (_, index) => index).map(rowOffset => (
          <div key={rowOffset}>
            {Array.from({length: columns}, (_, index) => index).map(columnOffset => {
              const module = modules.find((module) => module.offset.column === columnOffset && module.offset.row === rowOffset);

              return module && shallowequal(viewPortOffset, module.offset) ? (
                <Module style={{display: 'inline-flex'}} key={columnOffset}>{module.node}</Module>
              ) : null;
            })}
          </div>
        ))}
      </div>
    );
  }
}
