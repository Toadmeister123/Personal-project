module.exports = {
  getAllUserSurveys: (req, res) => {
    const db = req.app.get('db')
    db.api.get.get_all_user_surveys(req.session.user.id).then( response => {
      for(let i=0; i<response.length; i++){
        response[i] = response[i].row_to_json
      }
      res.status(200).send(response)
    })
  },

  getUserSurvey: (req, res) => {
    const db = req.app.get('db')
    req.params.id = parseInt(req.params.id)
    const {id} = req.params
    db.api.get.get_user_survey(id).then((response) => {
      console.log(id)
      for(let i=0; i<response.length; i++){
        response[i] = response[i].row_to_json
      }
      res.status(200).send(response[0])
    })
  },

  getAllSurveys: (req, res ) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {surveyName} = req.body
    db.api.get.get_all_surveys(surveyName, id).then( response => {
      res.status(200).send(response)
    })
  },

  createSurvey: (req, res) => {
    console.log('hit')
    const db = req.app.get('db')
    const { survey } = req.body
    let date = new Date()
    db.api.create.create_survey([survey.surveyName, date, req.session.user.id]).then( surveyInsert => {
      // console.log(surveyInsert)
      for(let i=0; i<survey.questions.length; i++){
        db.api.create.create_question(survey.questions[i].question, surveyInsert[0].id).then( questionInsert => {
          // console.log(questionInsert)
          for(let j=0; j<survey.questions[i].answers.length; j++){
            db.api.create.create_answer(survey.questions[i].answers[j].answer, surveyInsert[0].id, questionInsert[0].id).then( answerInsert => {
              // console.log(answerInsert)
            })
          }
        })
      }
    })
  },
  deleteSurvey: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.api.delete.delete_survey(id).then( response => {
      res.status(200).send(response)
    })
  },
  updateSurvey: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {surveyName} = req.body
    db.api.update.update_survey([surveyName, id]).then( response => {
      res.status(200).send(response)
    })
  },
  incrementResponses: (req, res) => {
    const db = req.app.get('db')
    req.params.id = parseInt(req.params.id)
    const {id} = req.params
    db.api.update.increment_responses([id]).then( response => {
      res.status(200).send(response)
    })
  },
  incrementTimesClicked: (req, res) => {
    const db = req.app.get('db')
    const {answers} = req.body
    for(const prop in answers) {
      let answer = answers[prop]
      db.api.update.increment_times_clicked([answer])
    }
  },
  getSurveyAnalysis: (req, res) => {
    const db = req.app.get('db')
    req.params.id = parseInt(req.params.id)
    const {id} = req.params
    db.api.get.get_survey_analysis([id]).then(response => {
      for(let i=0; i<response.length; i++){
        response[i] = response[i].row_to_json
      }
      res.status(200).send(response)
    })
  }
}