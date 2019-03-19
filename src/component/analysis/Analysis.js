import React, {Component} from 'react'
import axios from 'axios'


class Analysis extends Component {
  constructor() {
    super()
    this.state = {
      data: {
        labels: [0],
        datasets: [],
        reqStatus: null
      }
    }
  }

  handleRequest = () => {
    this.setState(
      {reqStatus: 'Request pending...'},
      () => this.getDataSet()
    )
  }

  getDataSet = () => {
    let currentData = Object.assign({}, this.state.data)
    let newSet = {
      label: `Rand Nums ${this.state.data.datasets.length + 1}`,
      backgroundColor: [],
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
    axios.get(``)
  }

  render(){
    return(
      <main>

      </main>
    )
  }
}


export default Analysis