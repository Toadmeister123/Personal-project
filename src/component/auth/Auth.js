import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'


class Auth extends Component{
  constructor(props){
    super(props)
    this.state = {
      username:'',
      email:'',
      password:''
    }
  
  }
  componentDidMount(){
    this.checkUser()
  }
  checkUser = async () => {
    const {id} = this.props
    if(!id) {
      try{
        let res = await axios.get('/api/current')
        this.props.updateUser(res.data)
        this.props.history('/dashboard')
      } catch (err) {
      }
      } else {
      this.props.history.push('/dashboard')
    }
  }
  handleChange(props, val){
    this.setState({
      [props]: val
    })
  }

  signUp = async () => {
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    try{
      let res = await axios.post('/auth/signup', user)
      this.props.updateUser(res.data)
      this.props.history.push('/dashboard')
      console.log(user)
    } catch (err) {
        alert('Choose different username or password')
        console.log(err)
    }
  }

  Login = async () => {
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    try{
      let res = await axios.post('/auth/login', user)
      this.props.updateUser(res.data)
      this.props.history.push('/dashboard')
    } catch (err) {
        alert('Incorrect username or password')
    }
  }
  render(){
    const {username, email, password} = this.state
    return(
      <div>
        <input placeholder="name" value={username} onChange={e => this.handleChange('username', e.target.value)}/>
        <input placeholder="email" value={email} onChange={e => this.handleChange('email', e.target.value)}/>
        <input placeholder="password" value={password} type="password" onChange={e => this.handleChange('password', e.target.value)}/>
        <button onClick={this.signUp}>Sign Up</button>
        <button onClick={this.Login}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    id: reduxState.id
  }
}
const mapDispatchToProps = {
  updateUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);