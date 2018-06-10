import React from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import TaskType from './TaskTypeFragment';

const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

class TaskTypeListPagination extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
    relay: PropTypes.object,
    onSelect: PropTypes.func,
  };

  onSelect = taskType => {
    console.log(['TaskTypeListPagination:onSelect:taskType'], taskType);

    this.props.onSelect(taskType);
  };

  render() {
    console.log(['TaskTypeListPagination:render'], this.props);
    const { classes, data: { list: { edges } }, onSelect } = this.props;
    const list = edges.map(({ node }) => node);

    return (
      <div className={classes.container}>
        {[...list].sort(({ order: orderA }, { order: orderB }) => orderA - orderB).map((data, key) => (
          <TaskType key={key} data={data} onSelect={onSelect} />
        ))}
      </div>
    );
  }
}

export default createPaginationContainer(
  withStyles(styles)(TaskTypeListPagination),
  graphql`
    fragment TaskTypeListPagination on TaskTypeListType
    @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
    )
    {
      id
      list (
          first: $count
          after: $cursor
      ) @connection(key: "TaskTypeList_list") {
        edges {
          node {
              id
              order
              ...TaskTypeFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
  {
    getConnectionFromProps(props) {
      return props.data && props.data.list;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }) {
      return { count, cursor };
    },
    query: graphql`
      query TaskTypeListPaginationQuery 
      {
        app {
          taskTypeList {
            ...TaskTypeListPagination
          }
        }
      }
    `,
  }
);
