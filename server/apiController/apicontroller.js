module.exports = {
  getSurvey: (req, res) => {
    const db = req.app.get('db')
    const {survey} = req.body
    db.api.get_survey(survey).then( response => {
      res.status(200).send(response)
    })
  },
  createSurvey: (req, res) => {
    console.log('hit')
    const db = req.app.get('db')
    const { survey } = req.body
    db.api.create.create_survey(survey.surveyName).then( surveyInsert => {
      console.log(surveyInsert)
      for(let i=0; i< survey.questions.length; i++){
        db.api.create.create_question(survey.questions[i].question, surveyInsert[0].id).then( questionInsert => {
          console.log(questionInsert)
          for(let j=0; j<survey.questions[i].answers.length; j++){
            db.api.create.create_answer(survey.questions[i].answers[j].answer, surveyInsert[0].id, questionInsert[0].id).then( answerInsert => {
              console.log(answerInsert)
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
  }
  // deleteQuestion: (req, res) => {
  //   const db = req.app.get('db')
  //   const {id} = req.params
  //   db.api.delete.delete_question(id).then( response => {
  //     res.status(200).send(response)
  //   })
  // },
  // deleteAnswer: (req, res) => {
  //   const db = req.app.get('db')
  //   const {id} = req.params
  //   db.api.delete.delete_answer(id).then( response => {
  //     res.status(200).send(response)
  //   })
  // }
}