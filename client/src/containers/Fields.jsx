import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Field from '../components/Field';

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
    const fieldsGroupedByOrder = fields.reduce((acc, { order, ...field }) => {
      if (!acc[order]) {
        acc[order] = [];
      }

      acc[order].push(field);

      return acc;
    }, []);
    console.log(['Fields:render:fieldsGroupedByOrder'], fieldsGroupedByOrder);

    return fieldsGroupedByOrder.map((fieldsInRow, key) => (
      <Paper className={classes.container} key={key}>
      {fieldsInRow.map(({ fieldId, format, ...props }) => (
        <Field
          {...props}
          key={fieldId}
          fieldId={fieldId}
          format={format}
          onChange={({ target: { value }}, alternativeValue) => {
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
            else if (format === 'BOOL') {
              onFieldChange(fieldId, {
                bool: alternativeValue,
              })
            }
          }}
        />
      ))}
      </Paper>
    ));
  }
}

export default withStyles(styles)(Fields);
