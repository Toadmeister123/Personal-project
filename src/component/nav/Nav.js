import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

function Nav(props){
  const {classes} = props
  if(props.location.pathname !== '/'){
    return(
      <div>
        <Link to='/dashboard'><Button variant="contained" className={classes.Button}>dashboard</Button></Link>
        <Link to='/mysurveys'><Button>My Surveys</Button></Link>
        <Link to='/createsurvey'><Button>Create Survey</Button></Link>
      </div>
    )
  }
  return null

}
 Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Nav)