import React from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import TaskType from './TaskType';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

class List extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    onSelect: PropTypes.func,
  };

  render() {
    const { list, onSelect } = this.props;

    return (
      <div style={styles.root}>
      {[...list].sort(({ order: orderA }, { order: orderB }) => orderA - orderB).map((data, key) => (
        <TaskType key={key} data={data} onSelect={onSelect} />
      ))}
      </div>
    );
  }
}

class TaskTypeList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    relay: PropTypes.object,
    onSelect: PropTypes.func,
  };

  onSelect = taskType => {
    console.log(['TaskTypeList:onSelect:taskType'], taskType);

    this.props.onSelect(taskType);
  };

  render() {
    const { data: { list: { edges } } } = this.props;

    return [
      <List
        key="TaskTypeList:List"
        list={edges.map(({ node }) => node)}
        onSelect={this.onSelect}
      />,
    ];
  }
}

export default createPaginationContainer(
  TaskTypeList,
  graphql`
    fragment TaskTypeList on TaskTypeListType {
      id
      list (
        first: 10
        # after: $cursor
      ) @connection(key: "TaskTypeList_list") {
        edges {
          node {
            id
            typeId
            name
            description
            order
            isCustom
            parentId
            fields: fieldsConfig {
              fieldId
              format
              order
              type
              label
              value {
                  ... on NumberValueType {
                      number
                  }
                  ... on TextValueType {
                      text
                      id
                  }
              }
              meta {
                  ... on NumberMetaType {
                      required
                      min
                      max
                  }
                  ... on TextMetaType {
                      required
                      minLen
                      maxLen
                      options {
                          text
                          value
                      }
                  }
              }
            }
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
      # (
        # $count: Int!
        # $cursor: String
      # ) 
      {
        app {
          taskTypeList {
            ...TaskTypeList
          }
        }
      }
    `,
  }
);
