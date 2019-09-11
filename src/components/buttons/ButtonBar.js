import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  primary: {
    marginRight: theme.spacing.unit * 2,
    display: 'inline-block'
  },
  secondary: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 2
  },
  spaceTop: {
    marginTop: 20
  }
})

class ButtonBar extends Component {

  

  render() {
    const { classes, onAction, onEdit } = this.props;

    return (
      <div className={classes.spaceTop}>
        {this.props.onEdit && 
          <Button
            onClick={onEdit}
            variant="outlined"
            color="primary"
            className={classes.secondary}
          >
          Edit
        </Button>
        }
        <Button
          onClick={onAction}
          variant="contained"
          color="primary"
          className={classes.secondary}
        >
          View Dashboard
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(ButtonBar);