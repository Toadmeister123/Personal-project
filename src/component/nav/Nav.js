import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearUser} from '../../ducks/reducer'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  root2: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end'
  },
  Button: {
    margin: 2,
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
  
  logout = async() => {
    await axios.post('/auth/logout')
    this.props.clearUser()
    this.props.history.push('/')
  }

  render() {
    const {classes} = this.props
    // const { open } = this.state
  if(this.props.location.pathname !== '/'){
    return(
      <div className={classes.root}>
        <AppBar position='static' >
          <Toolbar>
            <Link to='/dashboard' style={{ textDecoration: 'none'}}><Button size="small" variant="contained" color="secondary" className={classes.Button}>home</Button></Link>
            <Link to='/mysurveys' size='medium' style={{ textDecoration: 'none'}}><Button size="small" variant="contained" color="secondary" className={classes.Button}>My Surveys</Button></Link>
            <Link to='/createsurvey' size='medium' style={{ textDecoration: 'none'}}><Button size="small" variant="contained" color="secondary" className={classes.Button}>Create Survey</Button></Link>
             <Button style={{marginLeft: 'auto'}} variant="contained" size='small' color="secondary" className={classes.Logout} onClick={this.logout}>logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  return null

  }
}
const mapStateToProps = (reduxState) => {
  return reduxState
}
const mapDispatchToProps = {
  // updateUser,
  clearUser
}

 Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav)))

