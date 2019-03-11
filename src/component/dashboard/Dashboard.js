import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {clearUser, updateUser} from '../../ducks/reducer'

class Dashboard extends Component{
  componentDidMount(){

  }
  getUser = async() => {
    const {id} = this.props
    if(!id) {
      try{
        let res = await axios.get('/api/current')
        this.props.updateUser(res.data)
      } catch (err){
        this.props.history.push('/')
      }
    }
  }
  logout = async() => {
    await axios.post('/auth/logout')
    this.props.clearUser()
    this.props.history.push('/')
  }
  render(){
    return(
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.logout}>logout</button>
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