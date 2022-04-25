import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React} from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import{Container,Row} from 'react-bootstrap'

import Navigation from './Components/Navigation'
import Homepage from './Components/Homepage'
import Archive from './Components/Archive'

function App() {
  return (
    <Router>
     <div style={{ backgroundColor: "purple", minHeight: "100vh", width: "100%" }}>
     <Navigation/>
   <Container fluid>
     <Switch>
       
       <Route path="/homepage">
       <Homepage />
       </Route>

       <Route path="/archive">
       <Archive />
       </Route>

       <Redirect to="/homepage"/>
     </Switch>
   </Container>
       </div> 
   
 </Router>
  );
}

export default App;
