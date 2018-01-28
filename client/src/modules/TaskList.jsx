import React from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import CircularProgress from 'material-ui/CircularProgress';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import More from 'material-ui/svg-icons/navigation/more-horiz';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

const PAGE_SIZE = 5;
const TABLE_CONFIG = {
  selectable: true,
  style: { backgroundColor: 'transparent' },
  header: {
    style: { backgroundColor: 'transparent' },
    displaySelectAll: false,
    adjustForCheckbox: false,
  },
  body: {
    displayRowCheckbox: false,
    deselectOnClickaway: true,
    showRowHover: true,
    stripedRows: true,
  },
};

class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
  };

  onSelect = ([index]) => {
    if (index) {
      this.props.onSelect(this.props.data[index].id);
    }
  };

  render() {
    const { header, body, ...table } = TABLE_CONFIG;

    return (
      <Table
        {...table}
        onRowSelection={this.onSelect}
      >
        <TableHeader {...header}>
          <TableRow>
            <TableHeaderColumn colSpan="3" tooltip="Super Header">
              User task's list
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="The title of task">Title</TableHeaderColumn>
            <TableHeaderColumn tooltip="The priority of task">Priority</TableHeaderColumn>
            <TableHeaderColumn tooltip="The task status">Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody {...body}>
          {this.props.data.map(({ title, priority, status }, index) => (
            <TableRow key={index}>
              <TableRowColumn>{title}</TableRowColumn>
              <TableRowColumn>{priority}</TableRowColumn>
              <TableRowColumn>{status}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

class TaskList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onMore: PropTypes.func,
    onDetails: PropTypes.func,
  };

  onMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(PAGE_SIZE, () => {
      this.forceUpdate(); // when data comes, relay.isLoading is returning true, so we need to render page one more time
    });

    this.forceUpdate(); // initializing loadMore doesn't invoke rendering DOM. To change moreIcon to loader we need to render page
  };

  render() {
    const { data: { list: { edges, pageInfo: { hasNextPage } } }, onAdd, onDetails } = this.props;

    return [
      <List
        key="TaskList:List"
        data={edges.map(({ node }) => node)}
        onSelect={onDetails}
      />,
      <FlatButton
        key="Home:FlatButton"
        icon={<AddCircle />}
        style={{
          zIndex: 9,
          position: 'absolute',
          bottom: 0,
          color: '#8BC34A',
          left: 0,
          zoom: 3,
        }}
        onClick={onAdd}
      />,
      hasNextPage && (this.props.relay.hasMore() && !this.props.relay.isLoading() ? (
        <FlatButton
          key="TaskList:FlatButton"
          icon={<More />}
          style={{
            zIndex: 9,
            zoom: 3,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          onClick={this.onMore}
        />
      ) : (
        <CircularProgress
          key="TaskList:CircularProgress"
          size={80}
          thickness={10}
          style={{
            zIndex: 9,
            position: 'absolute',
            bottom: 0,
            right: 80,
            margin: 10,
          }}
        />
      )),
    ];
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
            id
            title
            status
            priority
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
