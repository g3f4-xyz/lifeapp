import React, { PureComponent } from 'react';
import { QueryRenderer, graphql } from 'react-relay'
import ErrorBoundary from '../../containers/ErrorBoundary';
import environment from '../../environment';
import Loader from '../../components/Loader';
import TaskTypeListPagination from './TaskTypeListPagination';

export default class TaskTypeListQuery extends PureComponent {
  render() {
    console.log(['TaskTypeListQuery:render'], this.props);
    return (
      <ErrorBoundary>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query TaskTypeListQuery {
              app {
                taskTypeList {
                  ...TaskTypeListPagination
                }
              }
            }
          `}
          render={({error, props}) => {
            if (error) {
              return <div>{JSON.stringify(error)}</div>;
            } else if (props) {
              return (
                <TaskTypeListPagination data={props.app.taskTypeList} {...this.props} />
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
