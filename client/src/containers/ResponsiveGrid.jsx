import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ZoomIn from '@material-ui/icons/ZoomIn';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const styles = {
  tileContainer: {
    overflow: 'scroll',
  },
  remove: {
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'pointer',
  },
  zoom: {
    position: 'absolute',
    top: 0,
    cursor: 'pointer',
  },
};

class ResponsiveGrid extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    layouts: PropTypes.object,
    onModuleClose: PropTypes.func,
    onModuleZoom: PropTypes.func,
    onLayoutChange: PropTypes.func,
  };

  static defaultProps = {
    className: 'layout',
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 30,
  };

  render() {
    const { classes, children, layouts, onLayoutChange, onModuleClose, onModuleZoom } = this.props;

    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={layouts}
          onLayoutChange={onLayoutChange}
        >
          {Children.map(children, (node, key) => (
            <Paper className={classes.tileContainer} key={key} data-grid={{ w: 6, h: 4, x: key * 2, y: 0, minW: 1, minH: 1 }}>
              {node}
              <IconButton
                className={classes.remove}
                onClick={() => onModuleClose(node.props.moduleId)}
              >
                <ClearIcon />
              </IconButton>
              <IconButton
                className={classes.zoom}
                onClick={() => onModuleZoom(node.props.moduleId)}
              >
                <ZoomIn />
              </IconButton>
            </Paper>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default withStyles(styles)(ResponsiveGrid);
