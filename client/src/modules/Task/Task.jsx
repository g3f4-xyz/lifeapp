import React from 'react';
import PropTypes from 'prop-types';
import TaskDetails from './TaskDetails';
import TaskEdit from './TaskEdit';

export default class Task extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    if (this.props.data.editMode) {
      return <TaskEdit {...this.props} />;
    }

    return <TaskDetails {...this.props} />;
  }
}
