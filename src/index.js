import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configStore from './configStore'

const render = (App) => {
  const store = configStore()

  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}
