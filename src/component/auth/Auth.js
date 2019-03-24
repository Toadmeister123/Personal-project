import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,

  },
  root2: {
    height: '400px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '5px 5px 5px #212121'
  },
  TextField: {
    margin: 5,
  },
  Button: {
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  }
})

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
    const {classes} = this.props
    const {username, email, password} = this.state
    return(
      <div className={classes.root}>
        <div className={classes.root2}>
      <Typography variant="h3">Welcome to SurveyChimp!</Typography>
        <TextField className={classes.TextField} variant="outlined" label="Name" placeholder="Name" value={username} onChange={e => this.handleChange('username', e.target.value)}/>
        <TextField className={classes.TextField} variant="outlined" label="Email" placeholder="email" value={email} onChange={e => this.handleChange('email', e.target.value)}/>
        <TextField className={classes.TextField} variant="outlined" label="Password" placeholder="Password" value={password} type="password" onChange={e => this.handleChange('password', e.target.value)}/>
          <div style={{display: 'flex', flexDirection: 'row', margin: 7}}>
            <Button className={classes.Button} variant="contained" color="primary" size="large" onClick={this.signUp}>Sign Up</Button>
            <Button className={classes.Button} variant="contained" color="primary" size="large" onClick={this.Login}>Login</Button>
          </div>
        </div>
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

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));