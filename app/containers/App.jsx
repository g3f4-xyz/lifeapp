import React from 'react';
import Relay from 'react-relay';
import Home from '../modules/Home';
import Grid from './Grid';

class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.shape({
      home: React.PropTypes.object,
    }),
  };

  state = {
    viewPortOffset: {
      column: 1,
      row: 1,
    },
  };

  onDirection = (viewPortOffset) => this.setState({ viewPortOffset });

  render() {
    const modules = [
      {
        desc: 'Home module',
        node: <Home home={this.props.app.home} />,
        offset: {
          column: 1,
          row: 1,
        },
      },
    ];
    const { viewPortOffset } = this.state;

    return (
      <div>
        <Grid
          modules={modules}
          viewPortOffset={viewPortOffset}
          onDirection={this.onDirection}
        />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        home {
          ${Home.getFragment('home')},
        }
      }
    `,
  },
});
