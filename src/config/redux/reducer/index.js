import { combineReducers } from '@reduxjs/toolkit'

import UserReducer from './user'
import LoadingReducer from './loading'
import adminReducer from './auth-admin'
import customerReducer from './auth-customer'

export default combineReducers({
  UserReducer,
  LoadingReducer,
  adminReducer,
  customerReducer
})