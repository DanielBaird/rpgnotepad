
import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import './reset.css'
import './App.scss'

import Game from './Games/Game'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Link to="/game/g1234/">Game g1234</Link>
          </Route>

          <Route path="/game/:gameId/:encId?">
            <Game />
          </Route>


        </Switch>
      </Router>
    </div>
  )
}

export default App
