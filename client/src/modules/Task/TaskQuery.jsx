import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import ErrorBoundary from '../../containers/ErrorBoundary';
import environment from '../../environment';
import Loader from '../../components/Loader';
import TaskFragment from './TaskFragment';

class TaskQuery extends Component {
  render() {
    console.log(['TaskQuery:render'], this.props);
    return (
      <ErrorBoundary>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query TaskQuery (
              $id: ID
              $type: String
            ) {
              app {
                task (id: $id type: $type) {
                  id
                  ...TaskFragment
                }
              }
            }
          `}
          variables={{
            id: this.props.isNew ? '' : this.props.taskId,
            type: this.props.type,
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{JSON.stringify(error)}</div>;
            } else if (props) {
              return (
                <TaskFragment data={props.app.task} {...this.props} />
              );
            }
            return (
              <Loader />
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

export default TaskQuery;
