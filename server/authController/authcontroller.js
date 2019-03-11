const bcrypt = require('bcryptjs')

module.exports = {
  sign_up: async (req, res) => {
    const {username, password, email} = req.body
    const {session} = req
    const db = req.app.get('db')
    let takenUsername = await db.auth.check_username({username})
    takenUsername = +takenUsername[0].count
    if(takenUsername !==0) {
      return res.sendStatus(409)
    } else {
    }
    let takenEmail = await db.auth.check_email({email})
    takenEmail = +takenEmail[0].count
    if(takenEmail !==0) {
      return res.sendStatus(409)
    } else{
    }
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    console.log(hash)
    let user = await db.auth.sign_up({username, email, password: hash})
    user = user[0]
    console.log({session})
    session.user = user
    console.log(user)
    res.status(200).send(session.user)
  },
  login: async (req, res) => {
    const {username, password, email} = req.body
    const {session} = req
    const db = req.app.get('db')
    let user = await db.auth.login({username, email})
    user = user[0]
    if(!user) {
      return res.sendStatus(401)
    }
    console.log(user)
    let authenticated = bcrypt.compareSync(password, user.password)
    if(authenticated){
      delete user.password
      session.user = user
      res.status(200).send(session.user)
    } else {
      res.sendStatus(401)
    }
  },
  logout: (req, res) => {
    req.session.destroy(function(){
      res.sendStatus(200)
    })
  },
  getUser: (req, res) => {
    const {user} = req.session
    if(user){
      res.status(200).send(user)
    } else {
      res.sendStatus(401)
    }
  }
}