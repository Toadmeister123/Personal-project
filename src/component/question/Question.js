import React, {Component} from 'react'

class Question extends Component{
  
  render(){
    const {i} = this.props
    return(
      <div>
          <button onClick={() => this.props.addAnswer(i)}>Add Answer</button>
          <input onChange={(e) => {this.props.updateQuestion(e.target.value, i)}} placeholder={"question" + i}/>
          <button onClick={() => {this.props.deleteQuestion(i)}}>Delete Question</button>
          {this.props.buildAnswersJSX(i)}
        </div>
    )
  }
}

export default Question;