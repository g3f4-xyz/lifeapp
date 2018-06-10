import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  content: {
    display: 'block',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class TaskListFragment extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onDetails: PropTypes.func,
    onEdit: PropTypes.func,
  };

  onExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    console.log(['TaskListFragment:render'], this.props);
    const { classes, data, onDelete, onDetails, onEdit } = this.props;
    const { id, taskType, title, description, priority, status } = data;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{`${title} (${taskType})`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.content}>
          <div>
            PRIORITY: {priority}
          </div>
          <div>
            STATUS: {status}
          </div>
          <div className={classes.actions}>
            <Button onClick={() => onDetails(id)}>Show</Button>
            <Button onClick={() => onEdit(id)}>Edit</Button>
            <Button onClick={() => onDelete(id)}>Delete</Button>
          </div>
          <div>
            {description}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default createFragmentContainer(
  withStyles(styles)(TaskListFragment),
  graphql`
    fragment TaskListFragment on TaskType {
      id
      taskType
      description
      title
      priority
      status
    }
  `,
);

