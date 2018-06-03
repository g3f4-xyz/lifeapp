import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import TaskListItem from './TaskListItem';

class Task extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onDetails: PropTypes.func,
    onEdit: PropTypes.func,
  };

  render() {
    console.log(['Task:render'], this.props)

    return (
      <TaskListItem {...this.props} />
    );
  }
}

export default createFragmentContainer(
  Task,
  graphql`
    fragment Task on TaskType {
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
