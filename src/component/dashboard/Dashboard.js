import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {clearUser, updateUser} from '../../ducks/reducer'
import TakeSurvey from '../take_survey/TakeSurvey'

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state = {
      surveyNames: [],
      survey: {},
      answers: {}
    }
  }
  componentDidMount(){
    this.getAllSurveys()
  }
  getUser = async() => {
    const {id} = this.props
    if(!id) {
      try{
        let res = await axios.get('/api/current')
        this.props.updateUser(res.data)
        this.props.history.push('/dashboard')
      } catch (err){
      }
    } else {
      this.props.history.push('/dashboard')
    }
  }
  logout = async() => {
    await axios.post('/auth/logout')
    this.props.clearUser()
    this.props.history.push('/')
  }

  getAllSurveys = () => {
    axios.get('/api/getAllSurveys').then(res => {
      this.setState({
        surveyNames: res.data
      })
    })
  }

  updateAnswers = (qId, aId) => {
    let answers = this.state.answers
    answers[qId] = aId
    this.setState({answers})
  }

  getUserSurvey = (id) => {
    axios.get(`/api/getUserSurvey/${id}`).then(res => {
      let answers = {}
      console.log(res.data)
      res.data.questions.forEach(question => {
        answers[question.id] = null
      });
      this.setState({
        survey: res.data,
        answers
      })
    })
  }

  render(){
    console.log(this.state)
    const mappedSurveyName = this.state.surveyNames.map((surveyName) => {
      return (
        <TakeSurvey 
        key={surveyName.id}
        surveyName={surveyName}
        survey={this.state.survey}
        questions={this.state.survey.questions}
        getUserSurvey={this.getUserSurvey}
        id={surveyName.id}
        updateAnswers={this.updateAnswers}
        answers={this.state.answers}
        />
      )
    })
    return(
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.logout}>logout</button>
        {mappedSurveyName}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}
const mapDispatchToProps = {
  updateUser,
  clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)