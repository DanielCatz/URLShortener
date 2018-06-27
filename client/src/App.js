import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Home from './pages/home';
import Short from './pages/short';
import Expired from './pages/expired';
class App extends Component {
  render() {
    return (
      
        <Router>
          <Switch>        
        <Route exact path='/home' component= {Home} />
        <Route exact path='/expired' component= {Expired} />
        <Route path='/' component= {Short} />        
          </Switch>
        </Router>
    
    );
  }
}

export default App;
