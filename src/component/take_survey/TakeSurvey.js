import React, {Component} from 'react'
import Modal from 'react-awesome-modal'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import propTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  }
})

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
    const {classes} = this.props
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
        <button onClick={() => this.openModal()}>TakeSurvey</button>
        <Modal visible={this.state.visible}   width="400px" height="600px" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className="" style={{overflowY: 'auto', height: '600px'}}>
            <h1>{this.props.surveyName.survey_name}</h1>
            {mappedQuestions}
            <Button color="primary" variant="contained" className={classes.button} onClick={() => this.finishSurvey()}>Finish</Button>
          </div>
        </Modal>
      </section>
    )
  }
}

TakeSurvey.propTypes = {
  classes: propTypes.object.isRequired
}

export default withStyles(styles)(TakeSurvey);