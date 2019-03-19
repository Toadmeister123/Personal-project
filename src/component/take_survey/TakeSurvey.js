import React, {Component} from 'react'
import Modal from 'react-awesome-modal'
import axios from 'axios'

class TakeSurvey extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      answers: {

      }
    }
  }

   openModal(){
    this.setState({
      visible: true
    })
    this.props.getUserSurvey(this.props.id)
  }

  closeModal(){
    this.setState({
      visible: false
    })
  }

  finishSurvey(){
    this.setState({
      visible: false
    })
    this.incrementResponse(this.props.id)
    this.incrementTimesClicked()
  }

  incrementResponse(id){
    axios.put(`/api/incrementResponses/${id}`).then(res => {

    })
  }

  incrementTimesClicked = () => {
    axios.put(`/api/incrementTimesClicked`, {answers:this.props.answers}).then( res => {
      console.log(res)
    })
  }
  
  render(){
    const mappedQuestions=  this.props.questions ? this.props.questions.map((question, i) => {
      
      return (
        <div key={question.id}>
          <h3>{question.question}</h3>
        {this.props.questions[i].answers.map((answer) => {
          return (
            <div key={answer.id}>
              <input onClick={() => this.props.updateAnswers(question.id, answer.id)} name={question.id} value={question.answer} type="radio"/>
              <p>{answer.answer}</p>
      </div>)})}
  </div>)})
              : null 
        
    return(
      <section>
        <h1>{this.props.surveyName.survey_name}</h1>
        <input type="button" value="Take Survey" onClick={() => this.openModal()}/>
        <Modal visible={this.state.visible} width="65%" height="90%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
            <h1>{this.props.surveyName.survey_name}</h1>
            {mappedQuestions}
            <button onClick={() => this.finishSurvey()}>Finish</button>
          </div>
        </Modal>
      </section>
    )
  }
}

export default TakeSurvey;