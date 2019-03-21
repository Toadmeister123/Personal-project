import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'
import indigo from '@material-ui/core/colors/indigo'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  icon : {
    margin: theme.spacing.unit,
    '&:hover' : {
      color: indigo[800],
    },
  },
})

class Question extends Component{
  
  render(){
    const {i, classes} = this.props
    return(
      <div>
          <Input className={classes.input} placeholder={"question" + i} onChange={(e) => {this.props.updateQuestion(e.target.value, i)}} />
          <Icon className={classes.icon} color="primary" onClick={() => this.props.addAnswer(i)}>add_circle</Icon>
          <Icon className={classes.icon} color="primary" onClick={() => {this.props.deleteQuestion(i)}}>delete</Icon>
          {this.props.buildAnswersJSX(i)}
        </div>
    )
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Question);