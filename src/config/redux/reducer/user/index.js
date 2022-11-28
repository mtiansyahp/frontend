import {
  LOGIN,
  LOGOUT,
} from '../../action'

const initialState = {
  userData: {},
  isLogin: false,
}

const UserReducer = (state = initialState, action) => {
  switch(action.type) {
  case LOGIN:
    return{
      ...state,
      isLogin: true,
      userData: action.user,
    }
  case LOGOUT:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default UserReducer