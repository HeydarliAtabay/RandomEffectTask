import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useEffect, useState} from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import{Container} from 'react-bootstrap'

import Navigation from './Components/Navigation'
import Homepage from './Components/Homepage'
import Archive from './Components/Archive'

import API from '../src/API'



function App() {
const [loading, setLoading]= useState(true)
const [dirty, setDirty]=useState(true)

const [effectList, setEffectList] = useState([])

useEffect(()=>{
  
if(dirty){

  API.getallEffects().then(newEffect=>{
    setEffectList(newEffect)
    setDirty(false)
    setLoading(false)
   })
}
    
}, [dirty, loading])

  return (
    <Router> 
     <Navigation/>
   <Container fluid>
     <Switch>
       <Route path="/homepage">
       <Homepage effects={effectList} />
       </Route>

       <Route path="/archive">
       <Archive />
       </Route>

       <Redirect to="/homepage"/>
     </Switch>
   </Container>
 </Router>
  );
}

export default App;
