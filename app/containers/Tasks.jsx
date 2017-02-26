import React from 'react';
import Relay from 'react-relay';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TABLE_CONFIG = {
  selectable: true,
  style: { backgroundColor:'transparent' },
  header: {
    style: { backgroundColor:'transparent' },
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

class TasksList extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

  render() {
    const { header, body, ...table } = TABLE_CONFIG;

    return (
      <div>
        <Table {...table}>
          <TableHeader {...header}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header">
                User task's list
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The title of task">Title</TableHeaderColumn>
              <TableHeaderColumn tooltip="The priority of task">Priority</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody {...body}>
          {this.props.data.map(({ id, title, priority }, index) => (
            <TableRow key={index}>
              <TableRowColumn>{id}</TableRowColumn>
              <TableRowColumn>{title}</TableRowColumn>
              <TableRowColumn>{priority}</TableRowColumn>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

class Tasks extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.object,
  };

  render() {
    return (
      <TasksList data={this.props.tasks.edges.map(({ node }) => node)}/>
    );
  }
}

export default Relay.createContainer(Tasks, {
  fragments: {
    tasks: () => Relay.QL`
      fragment on TaskConnection {
        edges {
          node {
            id,
            title,
            priority,
          },
        },
      }
    `,
  },
});
