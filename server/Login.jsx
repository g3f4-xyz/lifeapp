import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function FlatButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="display2" gutterBottom>
                  WELCOME TO LIFEAPP
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Button size="large" href="auth/google" className={classes.button}>
                  Connect with Google
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Button size="large" href="demo" className={classes.button}>
                  Try Demo
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlatButtons);
