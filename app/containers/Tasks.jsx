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
import FlatButton from 'material-ui/FlatButton';
import More from 'material-ui/svg-icons/navigation/more-horiz';

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
    onSelect: React.PropTypes.func,
  };

  onSelect = ([index]) => {
    if (index) {
      this.props.onSelect(this.props.data[index].id);
    }
  };

  render() {
    const { header, body, ...table } = TABLE_CONFIG;

    return (
      <div>
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
    onMore: React.PropTypes.func,
    onSelect: React.PropTypes.func,
  };

  render() {
    const { tasks, onMore, onSelect } = this.props;
    return (
      <div>
        <TasksList
          data={tasks.edges.map(({ node }) => node)}
          onSelect={onSelect}
        />
        <FlatButton
          icon={<More />}
          style={{ margin: 12 }}
          onClick={onMore}
        />
      </div>
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
