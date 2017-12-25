import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import ToeGame from './components/ToeGame'
import Game from './components/Game'
import GoGame from './components/GoGame'
import Sokoban from './components/Sokoban'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>      
          <Route path="/" exact component={Home}/>
          <Route path='/gobang' component={Game}/>
          <Route path='/toe' component={ToeGame}/>
          <Route path='/go' component={GoGame}/>
          <Route path='/sokoban' component={Sokoban}/>                 
        </Switch>
      </Router>
    )
  }
}

export default App
