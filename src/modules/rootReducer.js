// @flow

import { combineReducers } from 'redux-immutable'
import { reducer as learning} from './learning/duck'

export const rootReducer = combineReducers({
  learning
})
