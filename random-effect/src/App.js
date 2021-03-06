import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Row, Container } from "react-bootstrap";

import Navigation from "./Components/Navigation";
import Homepage from "./Components/Homepage";
import Archive from "./Components/Archive";
import LoginComponent from "./Components/LoginComponent"
import AdminDetails from "./Components/AdminDetails"

import API from "../src/API";

function App() {
const [loading, setLoading] = useState(true);
const [dirty, setDirty] = useState(true);
const [effectList, setEffectList] = useState([]); // for effect list
const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
const [message, setMessage] = useState(''); // for sending error messages
const [userId, setUserId]=useState(1) // userId

// Checking user authentication
useEffect(()=> {
  const checkAuth = async() => {
    try {
      await API.getUserInfo();
      setLoggedIn(true);
    } catch(err) {
      console.error(err.error);
    }
  };
  checkAuth();
}, []);

// getting all effects
  useEffect(() => {
    if (dirty) {
      API.getallEffects().then((newEffect) => {
        setEffectList(newEffect);
        setDirty(false);
        setLoading(false);
      });
    }
  }, [dirty, loading]);

  // login
  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUserId(user)
      setMessage({msg: `Welcome, ${user}!`, type: 'success'});
    } catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  }
// logout
  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setEffectList([])
    setMessage('')
  }


  return (
    <Router>
       {loggedIn? <Navigation loggedIn={loggedIn} logout={doLogOut} link={"/"} info={"Log out "} />: <Navigation loggedIn={loggedIn} logout={doLogOut} link="/login"info={"Log in "} />}
      {(loggedIn && message) &&<AdminDetails greetings={message.msg}/>}
      <Container fluid>
        <Switch>
         <Route path="/homepage" exact>
            <Homepage user={userId} effects={effectList} loggedIn={loggedIn} />
          </Route>

          <Route path="/archive" exact>
            <Archive />
          </Route>

          <Route path="/login" exact>
          <Row className="vh-100 below-nav">
          {loggedIn ? <Redirect to="/homepage"/> : <LoginComponent login={doLogIn} serverError={message.msg}/>}
          </Row>

          </Route>
          <Redirect to="/homepage"/>
        </Switch>
        </Container>
    </Router>
  );
}

export default App;
