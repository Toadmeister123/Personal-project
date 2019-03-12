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
    const mappedSurveys = this.state.surveys.map((survey) => {
      console.log(survey)
      return (
        <div key={survey.id}>
          <h1>{survey.survey_name}</h1>
          {survey.questions.map((question) => {
            return (
              <div key={question.id}>
              <h3>Question: {survey.questions[0].question}</h3>
              </div>
              {survey.questions[0].answers.map(answer => {
                return(
                  <div>
                  <input value={question.answer} type="checkbox" />
                  <p>{answer.answer}</p>
                  </div>
                  )
              
              })}
            })}
            </div>
          
          <button onClick={() => {this.deleteSurvey(survey.id)}}>Delete Survey</button>
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