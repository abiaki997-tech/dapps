import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Greeting from './greeting';
import Multisign  from "./multisign";
import Fileupload from './fileupload';
import erctoken from './erctoken';

function App() {


  return (


    <div>
      <Router>
        <Link to="/greeting">
          <button > Go Greeting</button>
        </Link>

        <Link to="/mutisign">
          <button > Go MultiSignature</button>
        </Link>

        <Link to ='/fileupload'>
          <button > File Uploads</button>
        </Link>

        <Link to="/erctoken">
          <button > erc </button>
        </Link>

        <Switch>
          <Route exact path='/greeting' component={Greeting} />
          <Route exact path='/mutisign' component={Multisign}/>
          <Route exact path='/fileupload' component={Fileupload}/>
          <Route exact path='/erctoken' component={erctoken}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;