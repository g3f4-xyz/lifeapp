import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Create from '@material-ui/icons/Create';
import { Label } from '../../components/index';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
};

export default class TaskDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    console.log(['TaskDetails:render'], this.props);
    if (!this.props.data) {
      return null;
    }

    const { taskType, fields } = this.props.data;

    return (
      <div style={styles.root}>
        <h1>{taskType}</h1>
      {fields
        .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
        .sort((a, b) => a.order - b.order)
        .map(({ fieldId, label, type, meta: { options }, value }) => (
        <div key={fieldId}>
          <Paper style={styles.row}>
            <div style={{ padding: 10, width: 200, textAlign: 'left' }}>
              <Create />
              <Label style={{ padding: 10 }}>{label}</Label>
            </div>
            <div style={{ width: '80%', textAlign: 'right' }}>
              <div style={{ padding: 20 }}>{value.text || value.number || value.id}</div>
            </div>
          </Paper>
        </div>
      ))}
      </div>
    );
  }
}
