import React, {Component} from 'react'
import axios from 'axios'
import {Pie} from 'react-chartjs-2'
import propTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graph: {
    height: '100%',
    width: '70vw',
    margin: 30,
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
          borderWidth: 1,
          hoverBackgroundColor: ['#ef9a9a', '#90caf9', '#fff59d', '#a5d6a7'],
          data: [],
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
          <div key={survey.id} >
            {survey.questions.map((question, i) => {
              return(
                <div key={question.id} className={classes.graph}>
                  <Pie 
                    className={classes.graph} 
                    data={question.chartData} 
                    options={{legend: {display: true, position: 'left'}, scales: {yAxes: [{display: false, gridLines: {display: false, tick: { display: false}}}]}, xAxes: [{ gridLines: {display: false, tick: { display: false}}}]}}
                  />
                </div>)})}
          </div>)})
    return(
      <div>
        {this.state.beforeData.length && <Typography variant="h5" >Responses: {this.state.beforeData[0].responses}</Typography>}
        <div className={classes.root} >

          {mappedCharts}
        </div>
      </div>
    )
  }
}

Analysis.propTypes = {
  classes: propTypes.object.isRequired
}


export default withStyles(styles)(Analysis);