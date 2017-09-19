import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay'
import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Tasks from '../containers/Tasks';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onDetails: PropTypes.func,
    onAdd: PropTypes.func,
  };

  render() {
    return [
      <Tasks
        key="Home:Tasks"
        data={this.props.data.home}
        onSelect={this.props.onDetails}
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
        onClick={this.props.onAdd}
      />
    ];
  }
}

export default createFragmentContainer(
  Home,
  graphql.experimental`
    fragment Home on App {
      home {
        id
        ...Tasks
      }
    }
  `
);
