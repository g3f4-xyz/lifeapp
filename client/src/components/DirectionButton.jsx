import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

const styles = {
  right: {
    position: 'absolute',
    zIndex: 9,
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
  },
  left: {
    position: 'absolute',
    zIndex: 9,
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
  },
  up: {
    position: 'absolute',
    zIndex: 9,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  down: {
    position: 'absolute',
    zIndex: 9,
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 0,
  },
};
const ICONS = {
  right: <RightIcon />,
  left: <LeftIcon />,
  up: <UpIcon />,
  down: <DownIcon />,
};

export default class DirectionIconButton extends React.Component {
  static propTypes = {
    direction: PropTypes.string,
    display: PropTypes.bool,
    onClick: PropTypes.func,
  };

  state = {
    visible: false,
  };

  onClick = () => this.props.onClick && this.props.onClick(this.props.direction);

  onMouseEnter = () => {
    this.setState({ visible: true });
  };

  onMouseLeave = () => {
    this.setState({ visible: false });
  };

  render() {
    const { direction, display } = this.props;
    const { visible } = this.state;

    return display ? (
      <IconButton
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ ...styles[direction], opacity: visible ? 1 : 0.1 }}
        onClick={this.onClick}
      >
        {ICONS[direction]}
      </IconButton>
    ) : null;
  }
}
