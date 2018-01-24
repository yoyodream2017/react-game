//@flow

import { combineEpics } from 'redux-observable'
import { pingEpic } from './learning/epic'

export const rootEpic = combineEpics(pingEpic)
