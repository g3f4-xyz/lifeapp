import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

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
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing.unit,
  },
  icon: {
    fontSize: theme.spacing.unit * 5,
  },
  green: {
    color: green[700],
  },
  grey: {
    color: grey[700],
  },
  red: {
    color: red[700],
  },
  yellow: {
    color: yellow[700],
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
          <div>
            <Tooltip title={`Status: ${status}`}>
              {{
                TODO: <CheckBoxOutlineBlankIcon className={classnames(classes.grey, classes.icon)} />,
                IN_PROGRESS: <SlideshowIcon className={classnames(classes.yellow, classes.icon)} />,
                DONE: <CheckBoxIcon className={classnames(classes.green, classes.icon)} />,
              }[status]}
            </Tooltip>
          {priority && (
            <Tooltip title="Important!">
              <PriorityHighIcon className={classnames(classes.red, classes.icon)} />
            </Tooltip>
          )}
          </div>
          <Typography className={classes.heading}>{`${title} (${taskType})`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.content}>
          <div>
            {description}
          </div>
          <div className={classes.actions}>
            <Button onClick={() => onDetails(id)}>Show</Button>
            <Button onClick={() => onEdit(id)}>Edit</Button>
            <Button onClick={() => onDelete(id)}>Delete</Button>
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

