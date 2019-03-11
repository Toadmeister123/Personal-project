import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Auth from './component/auth/Auth'
import CreateSurvey from './component/create_survey/CreateSurvey'
import Dashboard from './component/dashboard/Dashboard'
import MySurveys from './component/my_surveys/MySurveys'

export default (
  <Switch>
      <Route path="/createsurvey" component={CreateSurvey} />
      <Route path="/mysurveys" component={MySurveys} />
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/" component={Auth} />
  </Switch>
)