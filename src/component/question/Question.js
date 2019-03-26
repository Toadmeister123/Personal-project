import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'
import indigo from '@material-ui/core/colors/indigo'

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    margin: 60,
    padding: -20,
    borderRadius: 20,
    boxShadow: '2px 2px 2px black'
  },
  root2: {
  },
  input: {
    margin: theme.spacing.unit,
    width: '40%',

  },
  icon: {
    margin: 2,
    '&:hover' : {
      color: indigo[800],
    },
  }
})

class Question extends Component{
  
  render(){
    const {i, classes} = this.props
    return(
      <div className={classes.root}>
          <Input className={classes.input} placeholder={"question " + i} onChange={(e) => {this.props.updateQuestion(e.target.value, i)}} />
          <Icon className={classes.icon} color="primary" onClick={() => this.props.addAnswer(i)}>add_circle</Icon>
          <Icon className={classes.icon} color="primary" onClick={() => {this.props.deleteQuestion(i)}}>delete</Icon>
          <div className={classes.root2}>
            {this.props.buildAnswersJSX(i)}
          </div>
        </div>
    )
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Question);