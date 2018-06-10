import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import More from '@material-ui/icons/MoreHoriz';
import AddCircle from '@material-ui/icons/AddCircle';
import onDeleteMutation from '../../mutations/deleteTask';
import Loader from '../../components/Loader';
import Task from './TaskListFragment';

const PAGE_SIZE = 5;

const styles = {
  addButton: {
    zIndex: 9,
    position: 'absolute',
    bottom: 20,
    left: 20,
    height: 72,
    width: 72,
  },
  addButtonIcon: {
    fontSize: 72,
  },
  moreButton: {
    zIndex: 9,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 72,
    width: 72,
  },
  moreButtonIcon: {
    fontSize: 72,
  },
};

class TaskListPagination extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
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
    console.log(['TaskListPagination:onDelete'], id);
    onDeleteMutation({ id, parentId: this.props.data.id });
  };

  render() {
    console.log(['TaskListPagination:render'], this.props);
    const { classes, data, onAdd, onDetails, onEdit } = this.props;
    const { list: { edges, pageInfo } }  = data || { list: { edges: [], pageInfo: {} } };
    const tasks = edges.map(({ node }) => node);

    return (
      <Fragment>
      {tasks.map(data => (
        <Task
          key={data.id}
          data={data}
          onDelete={id => this.onDelete(id)}
          onDetails={onDetails}
          onEdit={onEdit}
        />
      ))}
      <IconButton
        className={classes.addButton}
        color="primary"
        onClick={onAdd}
      >
        <AddCircle className={classes.addButtonIcon} />
      </IconButton>
      {pageInfo.hasNextPage && (this.props.relay.hasMore() && !this.props.relay.isLoading() ? (
        <IconButton
          className={classes.moreButton}
          color="primary"
          onClick={this.onMore}
        >
          <More className={classes.moreButtonIcon} />
        </IconButton>
      ) : (
        <Loader />
      ))}
      </Fragment>
    );
  }
}

export default createPaginationContainer(
  withStyles(styles)(TaskListPagination),
  graphql`
    fragment TaskListPagination on TaskListType
    @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
#        cursor: { type: "ID" }
#        GraphQLParser: Variable \`$cursor\` was defined as type \`ID\`, but used in a location that expects type \`String\`. Source: document \`TaskListPagination\` file: \`modules/TaskList/TaskListPagination.jsx\`.
#        orderby: {type: "[FriendsOrdering]", defaultValue: [DATE_ADDED]}
    )
    {
      id
      list (
        first: $count
        after: $cursor
      ) @connection(key: "TaskList_list") {
        edges {
          node {
            id
            ...TaskListFragment
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
            ...TaskListPagination
          }
        }
      }
    `,
  }
);
