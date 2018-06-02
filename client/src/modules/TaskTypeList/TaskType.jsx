import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import InfoOutline from '@material-ui/icons/InfoOutline';
import SettingsIcon from '@material-ui/icons/Settings';

export default class TaskType extends React.Component {
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
  };

  render() {
    const { data, onSelect } = this.props;
    const { name, description, typeId } = data;

    return (
      <div
        style={{
          width: 250,
          height: 250,
          margin: 20,
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
          <IconButton
            key="TaskTypeList:List:IconButton:Info"
            style={{
              color: '#505ae8',
              height: 72,
              width: 72,
            }}
            onClick={this.onInfo}
          >
            <InfoOutline style={{ fontSize: 72 }}/>
          </IconButton>
          <IconButton
            key="TaskTypeList:List:IconButton:Add"
            style={{
              color: '#8BC34A',
              height: 72,
              width: 72,
            }}
            onClick={() => onSelect({
              fields: data.fields,
              taskType: typeId,
            })}
          >
            <AddCircle style={{ fontSize: 72 }}/>
          </IconButton>
        </div>
      </div>
    );
  }
}
