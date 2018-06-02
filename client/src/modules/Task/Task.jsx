import React from 'react';
import PropTypes from 'prop-types';
import TaskDetails from './TaskDetails';
import TaskEdit from './TaskEdit';

export default class Task extends React.Component {
  static propTypes = {
    editMode: PropTypes.bool,
  };

  render() {
    if (this.props.editMode) {
      return <TaskEdit {...this.props} />;
    }

    return <TaskDetails {...this.props} />;
  }
}
