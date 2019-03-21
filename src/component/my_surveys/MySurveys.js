import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


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
      // console.log(res)
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
    const mappedSurveys = this.state.surveys.map((survey) => {
      // console.log(survey)
      return (
        <div key={survey.id}>
        {this.state.editing ? (
          <div>
          <input 
            type="text"
            value={this.state.surveyName}
            onChange={(e) => {this.handleSurveyName(e.target.value)}}
            />
            </div>
        ) : (
        <h1>Title:{survey.survey_name}</h1>
        )}
          <button onClick={() => {this.deleteSurvey(survey.id)}}>Delete Survey</button>
          {this.state.editing ? (
            <button onClick={() => {this.updateSurvey(survey.id)}}>Save Name</button>
          ) : (
            <button onClick={() => {this.setEdit()}}>Edit Name</button>
          )}
         <Link to="/surveyanalytics"><button>Survey Analysis</button></Link>
          {survey.questions.map((question, i) => {
            return (
              <div key={question.id}>
                <h3>Question: {survey.questions[i].question}</h3>
              {survey.questions[i].answers.map((answer,i) => {
                return(
                  <div key={answer.id}>
                  {/* <input value={question.answer} type="checkbox" /> */}
                  <p>{answer.answer}</p>
            </div>)})}
          </div>)})}
        </div>)})
    return(
      <div>
        <h1>MySurveys</h1>
        {mappedSurveys}
      </div>
    )
  }
}


export default MySurveys;