import React, {Component} from 'react'
import Modal from 'react-awesome-modal'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import propTypes from 'prop-types'
import './TakeSurvey.css'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  survey: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    height: '100%',
    width: '50%',
    boxShadow: '5px 5px 5px black'
  },
  button: {
    margin: 0,
    // color: 'primary',
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
        <div key={question.id} className="Questions">
          <Typography variant="h6" >{question.question}</Typography>
        {this.props.questions[i].answers.map((answer) => {
          return (
            <div key={answer.id} className="Answers">
              <input className="checkbox" onClick={() => this.props.updateAnswers(question.id, answer.id)} name={question.id} value={question.answer} type="radio"/>
              <Typography variant="subtitle1">{answer.answer}</Typography>
      </div>)})}
  </div>)})
              : null 
        
    return(
      <section className={classes.survey}>
        <Typography variant="h5" >{this.props.surveyName.survey_name}</Typography>
        <Button variant="contained" size="small" className={classes.button} color='primary' style={{margin: 10}} onClick={() => this.openModal()}>Take Survey</Button>
        <Modal visible={this.state.visible}   width="400px" height="600px" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className="Modal">
            <Typography variant="h5">{this.props.surveyName.survey_name}</Typography>
            {mappedQuestions}
            <Button color="primary" variant="contained" size="large" className={classes.button} onClick={() => this.finishSurvey()}>Finish</Button>
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