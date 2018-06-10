import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BugReportIcon from '@material-ui/icons/BugReport';

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

class ErrorBoundary extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node,
  };

  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(info);
    console.error(error);
  }

  render() {
    const { classes } = this.props;

    if (this.state.hasError) {
      return [
        <h1 key="ErrorBoundary:Header" className={classes.header}>ERROR!</h1>,
        <BugReportIcon key="ErrorBoundary:BugReportIcon" className={classes.icon} />
      ];
    }

    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
