import React from 'react';
import IconButton from 'material-ui/IconButton';
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const styles = {
  right: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
  },
  left: {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
  },
  up: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  down: {
    position: 'absolute',
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

export default class DirectionButton extends React.Component {
  static propTypes = {
    direction: React.PropTypes.string,
    display: React.PropTypes.bool,
    onClick: React.PropTypes.func,
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
        style={{ ...styles[direction], zoom: 2, opacity: visible ? 1 : 0.1 }}
        onClick={this.onClick}
      >
        {ICONS[direction]}
      </IconButton>
    ) : null;
  }
}
