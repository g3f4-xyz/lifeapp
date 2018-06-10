import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker, Input, Select } from './form';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    minHeight: 50,
    width: '100%',
  },
};

class Fields extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    fields: PropTypes.array,
    onFieldChange: PropTypes.func,
  };

  render() {
    const { classes, fields, onFieldChange } = this.props;

    return fields
      .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
      .sort((a, b) => a.order - b.order)
      .map(({ fieldId, label, type, meta: { options }, value, info }) => (
        <Paper className={classes.row} key={fieldId}>
      {({
        CHOICE: (
          <Select
            id={fieldId}
            value={(value && value.id) || ''}
            label={label}
            info={info}
            options={options || []}
            onChange={({ target: { value } }) => onFieldChange(fieldId, { id: value })}
          />
        ),
        DATE: (
          <DatePicker
            autoOk
            value={value}
            helperText={info}
            options={options || []}
            onChange={({ target: { value } }) => {
              console.log(['onChange.value'], value);
              onFieldChange(fieldId, { id: value });
            }}
          />
        ),
        })[type] || (
          <Input
            label={label}
            placeholder={info}
            value={(value && (value.text || value.number)) || ''}
            onChange={({ target: { value } }) => {
              console.log(['onChange.value'], value);
              onFieldChange(fieldId, { text: value });
            }}
          />
        )}
      </Paper>
    ));
  }
}

export default withStyles(styles)(Fields);
