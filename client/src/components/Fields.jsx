import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Field from './Field';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing.unit,
    width: '100%',
  },
});

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
      .map(({ fieldId, format, ...props }) => (
        <Paper key={fieldId} className={classes.container}>
          <Field
            {...props}
            format={format}
            onChange={({ target: { value }}) => {
              if (format === 'TEXT') {
                onFieldChange(fieldId, {
                  text: value,
                });
              }
              else if (format === 'CHOICE') {
                onFieldChange(fieldId, {
                  id: value,
                })
              }
            }}
          />
        </Paper>
      ));
  }
}

export default withStyles(styles)(Fields);
