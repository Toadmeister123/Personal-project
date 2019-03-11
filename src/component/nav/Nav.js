import React from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'

function Nav(props){
  if(props.location.pathname !== '/'){
    return(
      <div>
        <p>Nav</p>
        <Link to='/dashboard'><button>dashboard</button></Link>
        <Link to='/mysurveys'><button>My Surveys</button></Link>
        <Link to='/createsurvey'><button>Create Survey</button></Link>
      </div>
    )
  }
  return null
}

export default Nav