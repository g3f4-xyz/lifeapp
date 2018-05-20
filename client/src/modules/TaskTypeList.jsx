import React from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import CircularProgress from 'material-ui/CircularProgress';
import { GridList, GridTile } from 'material-ui/GridList';
import Icon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import { Paper } from 'material-ui';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

class TaskType extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onSelect: PropTypes.func,
  };

  state = {
    info: false,
  };

  onInfo = () => {
    this.setState({
      info: !this.state.info,
    });
  }

  render() {
    const { data, onSelect } = this.props;
    const { name, description, typeId } = data;

    return (
      <div
        style={{ 
          width: 250,
          height: 250,
        }}
      >
        <div style={{
          height: '15%',
          width: '100%',
        }}>
          <h1>{name}</h1>
        </div>
        <div style={{
          height: '65%',
          width: '100%',
        }}>
        {this.state.info ? (
          <h3 style={{
            padding: 0,
            margin: 0,
          }}>{description}</h3>
        ) : (
          <SettingsIcon style={{
            height: '100%',
            width: '100%',
          }} />
        )}
        </div>
        <div style={{
          height: '25%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <FlatButton
            key="TaskTypeList:List:FlatButton:Info"
            icon={<InfoOutline style={{
              height: 36,
              width: 36,
            }}/>}
            style={{
              color: '#505ae8',
            }}
            onClick={this.onInfo}
          />
          <FlatButton
            key="TaskTypeList:List:FlatButton:Add"
            icon={<AddCircle style={{
              height: 36,
              width: 36,
            }}/>}
            style={{
              color: '#8BC34A',
            }}
            onClick={() => onSelect(typeId)}
          />
        </div>
      </div>
    );
  }
}

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

  render() {
    const { data: { list: { edges } }, onSelect } = this.props;

    return [
      <List
        key="TaskTypeList:List"
        list={edges.map(({ node }) => node)}
        onSelect={onSelect}
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