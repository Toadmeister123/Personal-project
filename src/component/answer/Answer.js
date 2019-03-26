import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import indigo from '@material-ui/core/colors/indigo'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
    width: '60%',
  },
  icon : {
    margin: theme.spacing.unit,
    '&:hover' : {
      color: indigo[800],
    },
  },
})

class Answer extends Component{
  
  render(){
    const {i, j, classes} = this.props
    return(
      <div>
          <Input className={classes.input} size="small" placeholder={"answer " + j + " for question " + i} onChange={(e) => {this.props.updateAnswer(e.target.value, i, j)}} />
          <Icon className={classes.icon} color="primary" onClick={() => {this.props.deleteAnswer(i)}}>highlight_off</Icon>
      </div>
    )
  }
}

Answer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Answer);