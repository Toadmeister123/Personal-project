import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.light,
  },
  margin: {
    margin: 4
  },
  question: {
    backgroundColor: '#fff',
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '5px 5px 5px black',
    borderRadius: 10,
  }
})

class MySurveys extends Component{
  constructor(){
    super()
    this.state = {
      surveys: [],
      surveyName: "",
      editing: false
    }
    this.deleteSurvey = this.deleteSurvey.bind(this)
    this.updateSurvey = this.updateSurvey.bind(this)
  }

  handleSurveyName(val){
    this.setState({
      surveyName: val
    })
  }

  setEdit(){
    this.setState({
      editing: true
    })
  }

  componentDidMount(){
    this.getAllUserSurveys()
  }

  getAllUserSurveys(){
    axios.get('/api/getAllUserSurveys').then( res => {
      this.setState({
        surveys: res.data,
        editing: false
      })
    })
  }

  deleteSurvey(id){
    axios.delete(`/api/deleteSurvey/${id}`).then( res => {
      this.setState({
        surveys: res.data
      })
      this.getAllUserSurveys()
    })
  }

  updateSurvey(id){
    axios.put(`/api/updateSurvey/${id}`, {surveyName: this.state.surveyName}).then(res => {
      this.getAllUserSurveys()
    })
  }
    
  render(){
    const {classes} = this.props
    const mappedSurveys = this.state.surveys.map((survey) => {
      return (
        <div key={survey.id}>
        {this.state.editing ? (
          <div>
          <Input 
            type="text"
            placeholder="Survey"
            value={this.state.surveyName}
            onChange={(e) => {this.handleSurveyName(e.target.value)}}
            />
            </div>
        ) : (
        <Typography variant="h4" style={{margin: "0"}}>{survey.survey_name}</Typography>
        )}
          <Button variant="contained" color="primary" size="small" className={classes.margin} onClick={() => {this.deleteSurvey(survey.id)}}>Delete Survey</Button>
          {this.state.editing ? (
            <Button variant="contained" color="primary" size="small" className={classes.margin} onClick={() => {this.updateSurvey(survey.id)}}>Save Name</Button>
          ) : (
            <Button variant="contained" color="primary" size="small" className={classes.margin} onClick={() => {this.setEdit()}}>Edit Name</Button>
          )}
         <Link style={{ textDecoration: 'none'}} to={`/surveyanalytics/${survey.id}`}><Button variant="contained" color="primary" size="small"  className={classes.margin} >Survey Analysis</Button></Link>
          {survey.questions.map((question, i) => {
            return (
              <div key={question.id} className={classes.question}>
                <Typography variant="h5" >{survey.questions[i].question}</Typography>
              {survey.questions[i].answers.map((answer,i) => {
                return(
                  <div key={answer.id} >
                  <Typography variant="h6">{answer.answer}</Typography>
            </div>)})}
          </div>)})}
        </div>)})
    return(
      <div className={classes.root} style={{margin: '0'}}>
        {mappedSurveys}
      </div>
    )
  }
}

MySurveys.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(MySurveys);