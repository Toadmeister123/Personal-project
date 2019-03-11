const initialState = {
  id: 0,
  username: '',
  email: '',
  profile_pic: '',
  surveys: [
    {
      question: "Does this work?",

    }
  ]
}

const UPDATE_USER = "UPDATE_USER"
const CLEAR_USER = "CLEAR_USER"



export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action
  switch(type){
    case UPDATE_USER:
      const {id, username, email, profile_pic} = payload
      return {...state, id, username, email, profile_pic }
    case CLEAR_USER:
      return {...state, id: 0, username: '', email: '', profile_pic: ''}
    default:
      return state
  }
}