import React, {Component} from 'react'
import axios from 'axios'
import Question from '../question/Question'
import Answer from '../answer/Answer'

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

  deleteQuestion = (i) => {
    let questions = this.state.survey.questions
    let newQuestions = questions.splice(i, 1);
    this.setState({
      questions: newQuestions
    })
  }

  deleteAnswer = (i, j) => {
    let survey = this.state.survey
    survey.questions[i].answers.splice(j, 1)
    this.setState({survey})
  }
  
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
        <Answer 
          key={j} 
          answer={answer} 
          j={j} 
          i={i} 
          updateAnswer={this.updateAnswer} 
          deleteAnswer={this.deleteAnswer}
        />
      )
    })
  }

  buildQuestionsJSX = () => {
    return this.state.survey.questions.map((question, i) => {
      return (
        <Question 
          key={i} 
          question={question} 
          i={i} 
          buildAnswersJSX={this.buildAnswersJSX} 
          addAnswer={this.addAnswer} 
          updateQuestion={this.updateQuestion} 
          deleteQuestion={this.deleteQuestion}  
        />
      )
    })
  }

  render(){
    // console.log(this.state.survey)
    return(
      <div>
        <h1>CreateSurvey</h1>
        <input onChange={(e) => {this.updateSurveyName(e.target.value)}} placeholder="Survey Name"/>
        <button onClick={this.addQuestion}>Add Question</button>
        {this.buildQuestionsJSX()}
        <button onClick={this.newSurvey}>Finish Survey</button>
      </div>
    )
  }
}


export default CreateSurvey