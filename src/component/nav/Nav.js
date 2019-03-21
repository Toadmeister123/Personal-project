import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener'
// import Grow from '@material-ui/core/Grow'
// import Paper from '@material-ui/core/Paper'
// import Popper from '@material-ui/core/Popper'
// import MenuItem from '@material-ui/core/MenuItem'
// import MenuList from '@material-ui/core/MenuList'

const styles = theme => ({
  root: {

  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  }
})

class Nav extends Component{
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  

  render() {
    const {classes} = this.props
    // const { open } = this.state
  if(this.props.location.pathname !== '/'){
    return(
      <div>
        <Link to='/dashboard' size={classes.button} style={{ textDecoration: 'none'}}><Button variant="contained" color="primary" className={classes.Button}>dashboard</Button></Link>
        <Link to='/mysurveys' size={classes.button} style={{ textDecoration: 'none'}}><Button variant="contained" color="primary" className={classes.Button}>My Surveys</Button></Link>
        <Link to='/createsurvey' size={classes.button} style={{ textDecoration: 'none'}}><Button variant="contained" color="primary" className={classes.Button}>Create Survey</Button></Link>
        
      </div>
    )
  }
  return null

  }
}
 Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Nav)

// handleToggle = () => {
  //   this.setState(state => ({open: !state.open}))
  // }

  // handleClose = event => {
  //   if (this.anchorEl.contains(event.target)){
  //     return
  //   }

  //   this.setState({open: false})
  // }

{/* <div>
        <Button 
        buttonRef={node => {
          this.anchorEl = node;
        }} 
        aria-owns={open ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={this.handleToggle}
        color="primary"
        >
          Menu
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
            {...TransitionProps}
            id="menu-list-gorw"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
            <Paper>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList >
                <Link to='/dashboard' style={{ textDecoration: 'none'}}><MenuItem onClick={this.handleClose}>dashboard</MenuItem></Link>
                <Link to='/mysurveys' style={{ textDecoration: 'none'}}><MenuItem onClick={this.handleClose}>My Surveys</MenuItem></Link>
                <Link to='/createsurvey' style={{ textDecoration: 'none'}}><MenuItem onClick={this.handleClose}>createsurvey</MenuItem></Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
            </Grow>
          )}
        </Popper>
        </div> */}