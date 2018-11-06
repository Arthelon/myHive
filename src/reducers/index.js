// Set up your root reducer here...
import { combineReducers } from 'redux'

import modules from './modules'

const rootReducer = combineReducers({
  ...modules.reducers
})
export default rootReducer
