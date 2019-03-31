require('dotenv').config()
const express = require('express')
const massive = require('massive')
const sessions = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(sessions)
const authctrl =require('./authController/authcontroller')
const apictrl = require('./apiController/apicontroller')

const app = express(),
      {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use(express.json())
app.use(sessions({
  store: new pgSession({
    pool: pgPool
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000000000000
  }
}))
app.use( express.static( `${__dirname}/../build` ) );

massive(CONNECTION_STRING).then( db => {app.set('db', db)
  console.log(`db is connected`)
  app.listen( SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`))
}).catch((err) => {
  console.log(err)
})

//AUTH
app.post('/auth/signup', authctrl.sign_up)
app.post('/auth/login', authctrl.login)
app.get('/api/current', authctrl.getUser)
app.post('/auth/logout', authctrl.logout)
//API
app.post('/api/createSurvey', apictrl.createSurvey)
app.get('/api/getAllUserSurveys', apictrl.getAllUserSurveys)
app.get('/api/getUserSurvey/:id', apictrl.getUserSurvey)
app.get('/api/getAllSurveys', apictrl.getAllSurveys)
app.get('/api/getSurveyAnalysis/:id', apictrl.getSurveyAnalysis)
app.delete('/api/deleteSurvey/:id', apictrl.deleteSurvey)
app.put('/api/updateSurvey/:id', apictrl.updateSurvey)
app.put('/api/incrementResponses/:id', apictrl.incrementResponses)
app.put('/api/incrementTimesClicked', apictrl.incrementTimesClicked)