import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { taskDataType } from '../../customPropTypes';
import TaskDetails from './TaskDetails';
import TaskEdit from './TaskEdit';

class TaskFragment extends React.Component {
  static propTypes = {
    editMode: PropTypes.bool,
    data: taskDataType,
  };

  onExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    console.log(['TaskFragment:render'], this.props);
    const { editMode, data, ...props } = this.props;

    return editMode ? (
      <TaskEdit data={data} {...props} />
    )  : (
      <TaskDetails data={data} {...props} />
    );
  }
}

export default createFragmentContainer(
  TaskFragment,
  graphql`
    fragment TaskFragment on TaskType {
      id
      taskType
      fields {
        fieldId
        format
        order
        type
        label
        info
        meta {
          ... on ChoiceMetaType {
            required
            defaultValue
            options {
              text
              value
            }
          }
          ... on NumberMetaType {
            required
            min
            max
          }
          ... on TextMetaType {
            required
            minLen
            maxLen
          }
        }
        value {
          ... on ChoiceValueType {
            id
          }
          ... on NumberValueType {
            number
          }
          ... on TextValueType {
            text
          }
        }
      }
    }
  `,
);

