import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: 'inline-flex',
};

class Label extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    children: PropTypes.node,
  };

  render() {
    const { className, classes, children } = this.props;

    return (
      <div className={classnames(className, classes.container)}>{children}</div>
    );
  }
}

export default withStyles(styles)(Label);
