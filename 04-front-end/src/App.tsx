import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import OfferScreen from './screens/OfferScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/" component={LoginScreen} exact></Route>
        <Route path="/offer" component={OfferScreen} exact></Route>
        <Route path="/profile" component={ProfileScreen} exact></Route>
          
      </main>
    </BrowserRouter>
  );
}

export default App;
