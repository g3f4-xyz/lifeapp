import React from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import More from 'material-ui/svg-icons/navigation/more-horiz';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Alarm from 'material-ui/svg-icons/action/alarm';
import { red500, greenA200 } from 'material-ui/styles/colors';

const PAGE_SIZE = 5;
const styles = {
  taskWrapper: { 
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
};

class Field extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    const { value, fieldId, format, order, type, label, info } = this.props.data;
    
    return (
      <Paper zDepth={1} style={{ width: 300, padding: 10, margin: 10 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div>{label}</div>
          <div>{value.text || value.number || value.id}</div>
        </div>
      </Paper>
    );
  };
}

class Task extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    expanded: PropTypes.boolean,
    onToggle: PropTypes.func,
    onDetails: PropTypes.func,
  };

  render() {
    const { expanded, data, onToggle, onDetails } = this.props;
    const { id, taskType, fields } = data;
    const { title, priority, status, additionalFields } = fields.reduce((result, field) => {
      if (field.fieldId === 'TITLE') {
        return {
          ...result,
          title: field,
        }
      }
      if (field.fieldId === 'PRIORITY') {
        return {
          ...result,
          priority: field,
          additionalFields: result.additionalFields.concat(field),
        }
      }
      if (field.fieldId === 'STATUS') {
        return {
          ...result,
          status: field,
          additionalFields: result.additionalFields.concat(field),
        }
      }

      return {
        ...result,
        additionalFields: result.additionalFields.concat(field),
      }
    }, { title: null, priority: null, status: null, additionalFields: [] });

    return (
      <Paper zDepth={3} style={{ padding: 20 }}>
        <Card
          key={id}
          expanded={expanded}
          onExpandChange={() => onToggle(id)}
        >
          <CardHeader
            title={title && title.value.text}
            actAsExpander={true}
            showExpandableButton={true}
          >
            <IconButton
              style={{ 
                margin: 'auto',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 84,
              }}
              tooltip={`${priority && priority.label}: ${priority && priority.value.id}`}
              touch={true}
            >
              <Alarm 
                color={red500}
              />
            </IconButton>
            <IconButton 
              style={{ 
                margin: 'auto',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 44,
              }}
              tooltip={`${status && status.label}: ${status && status.value.id}`}
              touch={true}
            >
              <ActionHome 
                color={greenA200}
              />
            </IconButton>
          </CardHeader>
          <CardText expandable={true} style={styles.taskWrapper}>
            <div style={{ width: '100%' }}>
              <FlatButton label="Show" onClick={() => onDetails(id)}/>
              <FlatButton label="Edit" />
              <FlatButton label="Delete" />
            </div>
          {additionalFields.map((field, key) => (
            <Field key={key} data={field} />
          ))}
          </CardText>
        </Card>
      </Paper>
    )
  }
}

class List extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    onDetails: PropTypes.func,
  };

  state = {
    expanded: [],
  };

  onToggle = (id) => {
    this.setState({
      expanded: this.state.expanded[id] ?
        this.state.expanded.filter(item => item !== id) :
        this.state.expanded.concat(id)
    });
  };

  render() {
    const { list, onDetails } = this.props;

    return list.map(data => 
      <Task
        key={data.id}
        expanded={this.state.expanded[data.id]}
        data={data}
        onDetails={onDetails}
        onToggle={this.onToggle}
      />
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
        list={edges.map(({ node }) => node)}
        onDetails={onDetails}
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
            taskType
            fields {
              fieldId
              format
              order
              type
              label
              value {
                ... on NumberValueType {
                  number
                }
                ... on TextNumberType{
                  text
                  id # tymczasowo do czasu dorobienia type dla ChoiceValueType
                }
              }
              info
              meta {
                ... on NumberMetaType {
                  required
                  min
                  max
                }
                ... on TextMetaType{
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
