import React, {Component} from 'react'

class Answer extends Component{
  
  render(){
    const {i, j} = this.props
    return(
      <div>
          <input onChange={(e) => {this.props.updateAnswer(e.target.value, i, j)}} placeholder={"answer " + j + " for question " + i}/>
          <button onClick={() => {this.props.deleteAnswer(i)}}>Delete Answer</button>
      </div>
    )
  }
}

export default Answer;