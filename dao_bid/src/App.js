

import React from "react";
import { BrowserRouter as Router,Routes as Switch, Route, Link } from 'react-router-dom';

import Sell_Bid  from "./sell_bid";
import Buy_Bid from "./buy_bid";
import viewToken from "./viewToken"

const Home = () => <div>
                      <button><Link to="/Sell_Bid">Sell Bid</Link></button>
                      <button><Link to="/Buy_Bid"> Buy Bid</Link></button>
                  </div>
// const About = () => <h1>About Us</h1>

function App() {


  return (


    <div>
      <h1>DAO Biding</h1>
      <Router>
        <Switch>
          <Route path="/" element={<Home/>} />
          <Route path='/Sell_Bid' element ={<Sell_Bid/>}/>
          <Route path='/Buy_Bid'  element ={<Buy_Bid/>}/>
          <Route path='/ViewToken' element ={<viewToken/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
