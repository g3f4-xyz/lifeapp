import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, graphql } from 'react-relay'
import ErrorBoundary from '../../containers/ErrorBoundary';
import environment from '../../environment';
import Loader from '../../components/Loader';
import TaskListPagination from './TaskListPagination';

export default class TaskListQuery extends PureComponent {
  static propTypes = {
    pageSize: PropTypes.number,
  };

  render() {
    console.log(['TaskListQuery:render'], this.props);
    return (
      <ErrorBoundary>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query TaskListQuery {
              app {
                taskList {
                  ...TaskListPagination
                }
              }
            }
          `}
          render={({ error, props }) => {
            if (error) {
              return <div>{JSON.stringify(error)}</div>;
            } else if (props) {
              console.log(['TaskListQuery:data:fetched'], props);
              return (
                <TaskListPagination data={props.app.taskList} {...this.props} />
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
