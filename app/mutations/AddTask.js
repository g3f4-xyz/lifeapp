import Relay from 'react-relay';

export default class AddTask extends Relay.Mutation {
  static fragments = {
    home: () => Relay.QL`
      fragment on Home {
          id,
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { addTask }`;
  }

  getVariables() {
    return this.props.task;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addTaskPayload @relay(pattern: true) {
        home {
          id
          tasks {
            edges {
              node {
                id
                priority
                status
                progress
                creationDate
                finishDate
                note
                title
              }
            }
          }
        }
        newTaskEdge
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'home',
      parentID: this.props.home.id,
      connectionName: 'tasks',
      edgeName: 'newTaskEdge',
      rangeBehaviors: {
        '': 'prepend',
        'orderby(newest)': 'prepend',
      },
    }];
  }

  getOptimisticResponse() {
    return {
      newTaskEdge: {
        node: this.props.task,
      },
      home: this.props.home,
    };
  }
}