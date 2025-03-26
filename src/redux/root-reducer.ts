import { combineReducers } from 'redux'
import userSlice, { IUserStateType } from './user'
import countSlice, { ICountStateType } from './count'

export type IReduxState = {
  user: IUserStateType
  count: ICountStateType
}

const reducer = combineReducers({
  user: userSlice,
  count: countSlice
})

export default reducer
