import React, {Component} from 'react'
import axios from 'axios'

class MySurveys extends Component{
  constructor(){
    super()
    this.state = {
      surveys: []
    }
  }
  componentDidMount(){
    this.getAllSurveys()
  }

  getAllSurveys(){
    axios.get('/api/getAllSurveys').then( res => {
      console.log(res)
      this.setState({
        surveys: res.data
      })
    })
  }

    deleteSurvey(id){axios.delete(`/api/deleteSurvey/${id}`).then( res => {this.setState({surveys: res.data})})};
    deleteQuestion(id){axios.delete(`/api/deleteQuestion/${id}`).then( res => {this.setState({surveys: res.data})})};
    deleteAnswer(id){axios.delete(`/api/deleteAnswer/${id}`).then( res => {this.setState({surveys: res.data})})};
  
    
  render(){
    const mappedSurveys = this.state.surveys.map(survey => {
      console.log(survey)
      return (
        <div key={survey.id}>
          <h1>{survey.survey_name}</h1>
          <h3>Question: {survey.question}</h3>
          <input value={survey.answer} type="checkbox" />
          <p>{survey.answer}</p>
          <button onClick={() => {this.deleteSurvey(survey.id)}}>Delete Survey</button>
          <button onClick={() => {this.deleteQuestion(survey.id)}}>Delete Question</button>
          <button onClick={() => {this.deleteAnswer(survey.id)}}>Delete Answer</button>
        </div>
      )
    })
    return(
      <div>
        <h1>MySurveys</h1>
        {mappedSurveys}
      </div>
    )
  }
}


export default MySurveys;