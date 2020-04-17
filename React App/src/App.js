import React from 'react'
import {Home} from './components/Home'
import {Customer} from './components/Customer'
import {Product} from './components/Product'
import {Store} from './components/Store'
import {Sales} from './components/Sales'
import {Navigation} from './components/Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

  
function App() {
  return (
    <BrowserRouter>
     
    <div className="container">

      <h3 className="m-3 d-flex justify-content-center">React JS with Web API Demo</h3>
      

      <Navigation></Navigation>
      


      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/Customer' component={Customer}/>
        <Route path='/Product' component={Product}/>
        <Route path='/Store' component={Store}/>
        <Route path='/Sales' component={Sales}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
