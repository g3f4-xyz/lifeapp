import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// import ActionHome from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Alarm from '@material-ui/icons/Alarm';
// import red from '@material-ui/core/colors/red';
// import green from '@material-ui/core/colors/green';

const styles = theme => ({
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  fields: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class Field extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    const { value, label /*, fieldId, format, order, type, info */ } = this.props.data;

    return (
      <Paper elevation={1} style={{ width: 300, padding: 10, margin: 10 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div>{label}</div>
          <div>{value && (value.text || value.number || value.id)}</div>
        </div>
      </Paper>
    );
  };
}

class Task extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onDetails: PropTypes.func,
    onEdit: PropTypes.func,
  };

  state = {
    expanded: false,
  };

  onExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    const { classes, data, onDelete, onDetails, onEdit } = this.props;
    const { id, /* taskType, */fields } = data;
    const { title, /*priority, status, */additionalFields } = fields.reduce((result, field) => {
      if (field.fieldId === 'TITLE') {
        return {
          ...result,
          title: field,
        }
      }
      // if (field.fieldId === 'PRIORITY') {
      //   return {
      //     ...result,
      //     priority: field,
      //     additionalFields: result.additionalFields.concat(field),
      //   }
      // }
      // if (field.fieldId === 'STATUS') {
      //   return {
      //     ...result,
      //     status: field,
      //     additionalFields: result.additionalFields.concat(field),
      //   }
      // }

      return {
        ...result,
        additionalFields: result.additionalFields.concat(field),
      }
    }, { title: null, /*priority: null, status: null, */additionalFields: [] });

    return (
      <Paper elevation={3} style={{ padding: 20 }}>
        <Card key={id}>
            <CardHeader title={title && title.value && title.value.text} />
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={this.onExpand}
              aria-expanded={expanded}
              aria-label="More"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <div className={classes.actions}>
                <Button onClick={() => onDetails(data)}>Show</Button>
                <Button onClick={() => onEdit(data)}>Edit</Button>
                <Button onClick={() => onDelete(id)}>Delete</Button>
              </div>
              <div className={classes.fields}>
              {additionalFields.map((data, key) => (
                <Field key={key} data={data} />
              ))}
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    )
  }
}

export default createFragmentContainer(
  withStyles(styles)(Task),
  graphql`
      fragment Task on TaskType {
          id
          taskType
          fields {
              fieldId
              format
              order
              type
              label
              info
              meta {
                  ... on ChoiceMetaType {
                      required
                      defaultValue
                      options {
                          text
                          value
                      }
                  }
                  ... on NumberMetaType {
                      required
                      min
                      max
                  }
                  ... on TextMetaType {
                      required
                      minLen
                      maxLen
                  }
              }
              value {
                  ... on ChoiceValueType {
                      id
                  }
                  ... on NumberValueType {
                      number
                  }
                  ... on TextValueType {
                      text
                  }
              }
          }
      }
  `,
);

