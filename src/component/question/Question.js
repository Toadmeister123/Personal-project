import React, {Component} from 'react'

class Question extends Component{
  render(){
    const {i} = this.props
    return(
      <div>
          <button onClick={() => this.props.addAnswer(i)}>Add Answer</button>
          {/* <button onClick={() => {this.deleteQuestion()}}>Delete Question</button> */}
          <input onChange={(e) => {this.props.updateQuestion(e.target.value, i)}} placeholder={"question" + i}/>
          {this.props.buildAnswersJSX(i)}
        </div>
    )
  }
}

export default Question;