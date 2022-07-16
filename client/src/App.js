import './App.css';
import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Landing} from './Components/Landing/Landing'
import {Home} from './Components/Home/Home'
import {Temperaments} from './Components/Temperaments/Temperaments'
import {Form} from './Components/Form/Form'
import {Details} from './Components/Details/Details'
import { SearchedDogs } from './Components/SearchedDogs/SearchedDogs';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/"><Landing/></Route>
        <Route exact path = "/home" ><Home/></Route>
        <Route exact path = "/dogs/:id" ><Details/></Route>
        <Route exact path = "/dogs" ><SearchedDogs/></Route>
        <Route exact path = "/temperaments" ><Temperaments/></Route>
        <Route exact path = "/dog" ><Form/></Route>
      </Switch>
    </div>
  );
}

export default App;
