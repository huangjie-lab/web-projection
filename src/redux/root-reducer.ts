import { combineReducers } from 'redux';
import userSlice from './user';
import countSlice from './count';
const reducer = combineReducers({
  user: userSlice,
  count: countSlice
});

export default reducer;
