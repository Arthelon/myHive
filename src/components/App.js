import { Route } from 'react-router-dom'
import React from 'react'

import { HomePage } from './HomePage/HomePage'
import { LoginPage } from './LoginPage/LoginPage'
import { PrivateRoute } from './PrivateRoute'
import Navbar from './nav/Navbar'

class App extends React.Component {
  render () {
    return (
      <div className="h-100">
        <Navbar/>
        <div className="container">
          <div className="col-sm-8 h-100 offset-sm-2 mt-3">
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
