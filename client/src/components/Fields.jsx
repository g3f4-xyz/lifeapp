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
  },
};

class Fields extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    onFieldChange: PropTypes.func,
    fields: PropTypes.array,
  };

  render() {
    const { classes, fields, onFieldChange } = this.props;

    return fields
      .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
      .sort((a, b) => a.order - b.order)
      .map(({ fieldId, label, type, meta: { options }, value, info }) => (
        <div key={fieldId}>
          <Paper className={classes.row}>
            <div style={{ width: '100%' }}>
              {({
                CHOICE: (
                  <Select
                    style={{ width: '80%' }}
                    value={(value && value.id) || ''}
                    label={label}
                    placeholder={info}
                    options={options || []}
                    onChange={({ target: { value } }) => {
                      console.log(['onChange.value'], value);
                      onFieldChange(fieldId, { id: value });
                    }}
                  />
                ),
                DATE: (
                  <DatePicker
                    textFieldStyle={{ width: '80%' }}
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
                  style={{ width: '80%' }}
                  label={label}
                  placeholder={info}
                  value={(value && (value.text || value.number)) || ''}
                  onChange={({ target: { value } }) => {
                    console.log(['onChange.value'], value);
                    onFieldChange(fieldId, { text: value });
                  }}
                />
              )}
            </div>
          </Paper>
        </div>
      ));
  }
}

export default withStyles(styles)(Fields);