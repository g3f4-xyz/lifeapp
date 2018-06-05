import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import IconButton from '@material-ui/core/IconButton';
import More from '@material-ui/icons/MoreHoriz';
import AddCircle from '@material-ui/icons/AddCircle';
import onDeleteMutation from '../../mutations/deleteTask';
import Loader from '../../components/Loader';
import Task from './Task';

const PAGE_SIZE = 5;

class TaskList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onMore: PropTypes.func,
    onDetails: PropTypes.func,
    onEdit: PropTypes.func,
  };

  onMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(PAGE_SIZE, () => { // #FIXIT
      this.forceUpdate(); // when data comes, relay.isLoading is returning true, so we need to render page one more time
    });

    this.forceUpdate(); // initializing loadMore doesn't invoke rendering DOM. To change moreIcon to loader we need to render page
  };

  onDelete = id => {
    console.log(['TaskList:onDelete'], id);
    onDeleteMutation({ id, parentId: this.props.data.id });
  };

  render() {
    const { data, onAdd, onDetails, onEdit } = this.props;
    const { list: { edges, pageInfo } }  = data || { list: { edges: [], pageInfo: {} } };
    const tasks = edges.map(({ node }) => node);

    return (
      <Fragment>
      {tasks.map((data, key) => (
          <Task
            key={key}
            data={data}
            onDelete={id => this.onDelete(id)}
            onDetails={onDetails}
            onEdit={onEdit}
          />
      ))}
      <IconButton
        style={{
          zIndex: 9,
          position: 'absolute',
          bottom: 20,
          left: 20,
          height: 72,
          width: 72,
        }}
        color="primary"
        onClick={onAdd}
      >
        <AddCircle style={{ fontSize: 72 }} />
      </IconButton>
      {pageInfo.hasNextPage && (this.props.relay.hasMore() && !this.props.relay.isLoading() ? (
        <IconButton
          style={{
            zIndex: 9,
            position: 'absolute',
            bottom: 20,
            right: 20,
            height: 72,
            width: 72,
          }}
          color="primary"
          onClick={this.onMore}
        >
          <More style={{ fontSize: 72 }} />
        </IconButton>
      ) : (
        <Loader />
      ))}
      </Fragment>
    );
  }
}

export default createPaginationContainer(
  TaskList,
  graphql`
    fragment TaskList on TaskListType {
      id
      list (
        first: $count
        after: $cursor
      ) @connection(key: "TaskList_list") {
        edges {
          node {
            ...Task
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
      query TaskListPaginationQuery (
        $count: Int!
        $cursor: String
      ) {
        app {
          taskList {
            ...TaskList
          }
        }
      }
    `,
  }
);
