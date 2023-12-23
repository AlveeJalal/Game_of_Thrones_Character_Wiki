/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import AddImpression from "./components/addImpression"
import CharactersList from "./components/charactersList"
import Character from "./components/character"
import Login from "./components/login"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function App() {
const [user, setUser] = useState(null)

async function login(user = null)
{
  setUser(user)
}

async function logout()
{
  setUser(null)
}



  return (
    <div className="App"> 
      
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Game of Thrones Character Wiki</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/ahj24_characters"}>Characters</Link>
            </Nav.Link>
            <Nav.Link>
            {user ? (
              <a>Logout User</a>
            ): (<Link to={"/ahj24_login"}>Login</Link>
            )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>

      <Route exact path={["/", "/ahj24_characters"]}
      component={CharactersList}>
      </Route>
      
      <Route path="/ahj24_characters/:id/impression" render={(props)=>
      <AddImpression {...props} user={user}/>
      }>
      </Route>

      <Route path="/ahj24_characters/:id/" render ={(props)=>
      <Character {...props} user={user}/>
      }>
      </Route>
      
      <Route path="/ahj24_login" render={(props)=>
      <Login {...props} login={login}/>
      }>
      </Route>

      </Switch>
    </div>
    
  );
  
}


export default App;
