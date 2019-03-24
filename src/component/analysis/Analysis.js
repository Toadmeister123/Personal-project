import React, {Component} from 'react'
import axios from 'axios'
import {Pie} from 'react-chartjs-2'
import propTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.primary.light,
    margin: 0,
  }
})

class Analysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beforeData: [],
    }
  }

  componentDidMount(){
    axios.get(`/api/getSurveyAnalysis/${this.props.match.params.id}`).then( res => {
      console.log(res.data)
      let beforeData = []
      beforeData.push(res.data[0])
      beforeData[0].questions.forEach(question=>{
        question.chartData = {}
        question.chartData.labels = []
        question.chartData.datasets = [{
          label: question.question,
          backgroundColor: ['#f44336', '#2196f3', '#ffeb3b', '#4caf50'],
          borderColor: '#000',
          borderWidth: 3,
          hoverBackgroundColor: ['#ef9a9a', '#90caf9', '#fff59d', '#a5d6a7'],
          data: []
        }]
        question.answers.forEach(answer=>{
          question.chartData.labels.push(answer.answer)
          question.chartData.datasets[0].data.push(answer.times_clicked)
        })
      })
      console.log(beforeData)
      this.setState({
        beforeData
      })
    })
  }

  render(){
    const {classes} = this.props
    const mappedCharts = this.state.beforeData.map((survey, i) => {
        console.log('hit')
        return(
          <div key={survey.id}>
            {survey.questions.map((question, i) => {
              return(
                <div key={question.id}>
                <Pie data={question.chartData} options={{scales: {yAxes: [{ticks: {beginAtZero: true}}]}}}/>
                </div>
              )
            })}
          </div>
        )
    })
    return(
      <main >
      {console.log(this.state.beforeData.responses)}
      <h1>{this.state.beforeData.survey_name}</h1>
        {mappedCharts}
      </main>
    )
  }
}

Analysis.propTypes = {
  classes: propTypes.object.isRequired
}


export default withStyles(styles)(Analysis);