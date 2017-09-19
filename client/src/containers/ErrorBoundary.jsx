import React from 'react';
import PropTypes from 'prop-types';
import BugReportIcon from 'material-ui/svg-icons/action/bug-report';

const styles = {
  header: {
    fontSize: 72,
    textAlign: 'center',
  },
  icon: {
    marginLeft: '15%',
    width: '70%',
    height: '70%',
  },
};

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(info);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      console.log(['BugReportIcon'])
      return [
        <h1 key="ErrorBoundary:Header" style={styles.header}>ERROR!</h1>,
        <BugReportIcon key="ErrorBoundary:BugReportIcon" style={styles.icon} />
      ];
    }
    return this.props.children;
  }
}