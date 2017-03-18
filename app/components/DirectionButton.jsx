import React from 'react';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  right: {
    position: 'absolute',
    top: '50%',
    left: '88%',
  },
  left: {
    position: 'absolute',
    top: '50%',
    left: '0%',
  },
  up: {
    position: 'absolute',
    top: '0%',
    left: '50%',
  },
  down: {
    position: 'absolute',
    top: '90%',
    left: '50%',
  },
};

export default class DirectionButton extends React.Component {
  static propTypes = {
    direction: React.PropTypes.string,
    display: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  onClick = () => this.props.onClick(this.props.direction);

  render() {
    const { direction, display } = this.props;

    return display ? (
      <div>
        <FlatButton
          label={direction}
          style={styles[direction]}
          onClick={this.onClick}
        />
      </div>
    ) : null;
  }
}
