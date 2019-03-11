import React, {Component} from 'react'
import axios from 'axios'
import Question from '../question/Question'

class CreateSurvey extends Component{
  constructor(){
    super()
    this.state = {
      survey: {
        surveyName: "",
        questions: []
      }
    }
  }

  handleChange(props, val) {
    this.setState({
      [props]: val
    })
  }

  newSurvey = () => {
    axios.post('/api/createSurvey', {survey: this.state.survey}).then(res => {
      console.log(res)
    })
  }

  deleteSurvey = (id) => {
    axios.delete(`/api/deleteSurvey/${id}`).then( res => {
      this.setState({
        survey: res.data
      })
    })
  }

  // deleteQuestion = (id) => {
  //   axios.delete(`/api/deleteQuestion/${id}`).then( res => {
  //     this.setState({
  //       questions: res.data
  //     })
  //   })
  // }

  // deleteAnswer = (id) => {
  //   axios.delete(`/api/deleteAnswer/${id}`).then( res => {
  //     this.setState({
  //       answer: res.data
  //     })
  //   })
  // }

  updateSurveyName = ( val ) => {
    let survey = this.state.survey
    survey.surveyName = val
    this.setState({survey})
  }

  updateQuestion = (val, i) => {
    let survey = this.state.survey
    survey.questions[i].question = val
    this.setState({survey})
  }

  updateAnswer = (val, i, j) => {
    let survey = this.state.survey
    survey.questions[i].answers[j].answer = val
    this.setState({survey})
  }

  addAnswer = (i) => {
    let survey = this.state.survey
    let answers = survey.questions[i].answers
    answers.push({answer:""})
    this.setState({survey})
  }

  addQuestion = () => {
    let survey = this.state.survey
    let questions = survey.questions
    questions.push({
      question: "",
      answers:[]
    })
    this.setState({survey})
  }
  
  buildAnswersJSX = (i) => {
    return this.state.survey.questions[i].answers.map((answer, j) => {
      return (
        <div>
          <input onChange={(e) => {this.updateAnswer(e.target.value, i, j)}} placeholder={"answer " + j + " for question " + i}/>
          {/* <button onClick={() => this.deleteAnswer()}>Delete Answer</button> */}
        </div>
      )
    })
  }

  buildQuestionsJSX = () => {
    return this.state.survey.questions.map((question, i) => {
      return (
        <Question key={i} question={question} i={i} buildAnswersJSX={this.buildAnswersJSX} addAnswer={this.addAnswer} updateAnswer={this.updateAnswer}  />
        
      )
    })
  }

  render(){
    console.log(this.state.survey)
    return(
      <div>
        <h1>CreateSurvey</h1>
        <input onChange={(e) => {this.updateSurveyName(e.target.value)}} placeholder="Survey Name"/>
        <button onClick={this.newSurvey}>Create Survey</button>
        <button onClick={() => this.deleteSurvey()}>Delete Survey</button>
        <button onClick={this.addQuestion}>Add Question</button>
        {this.buildQuestionsJSX()}
      </div>
    )
  }
}


export default CreateSurvey