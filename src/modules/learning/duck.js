import { fromJS } from 'immutable'

// Action type
export const PING = 'PING'
export const PONG = 'PONG'

// Actions
export const Ping = () => ({
  type: PING
})

export const Pong = () => ({
  type: PONG
})

export const initialState = fromJS({
  number: 0
})

// Reducer
export const reducer = (state = initialState, action ) => {
  switch (action.type) {
  case PING: {
    return state.set('number', Number(new Date()))
  }
  case PONG: {
    console.log(state.toJS())
  }
  default:
    return state
  }
}
