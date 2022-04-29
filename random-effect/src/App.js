import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Navigation from "./Components/Navigation";
import Homepage from "./Components/Homepage";
import Archive from "./Components/Archive";
import LoginComponent from "./Components/LoginComponent"
import AdminDetails from "./Components/AdminDetails"

import API from "../src/API";

function App() {
const [loading, setLoading] = useState(true);
const [dirty, setDirty] = useState(true);
const [effectList, setEffectList] = useState([]);
const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
const [message, setMessage] = useState('');
const [userId, setUserId]=useState(1)


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
     
        <Switch>
         <Route path="/homepage">
            <Homepage effects={effectList} loggedIn={loggedIn} />
          </Route>

          <Route path="/archive">
            <Archive />
          </Route>

          <Route path="/login">
          <Row className="vh-100 below-nav">
          {loggedIn ? <Redirect to="/homepage" /> : <LoginComponent login={doLogIn} serverError={message.msg}/>}
          </Row>

          </Route>
         {!loggedIn && <Redirect to="/homepage" />} 
        </Switch>
    </Router>
  );
}

export default App;
