import 'rxjs'

export const pingEpic = action$ =>
  action$.ofType('PING')
    .delay(1000)
    .mapTo({ type: 'PONG' })
