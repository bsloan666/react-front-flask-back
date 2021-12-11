import './App.css';
import Add2 from './Add2';
import Login from './Login';
import CreateAccount from './CreateAccount';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="top-level-box">
        <div className="App">
          <header className="App-header">
            <h1>
              Add Two Numbers 
            </h1>
          </header>
        </div>
        <br />
      </div>
      <Switch>
        <Route exact path="/">
          <div className="app_content">
            <Add2> </Add2>
          </div>
        </Route>
        <Route exact path="/login">
          <div className="app_content">
            <Login> </Login>
          </div>
        </Route>
        <Route exact path="/create_account">
          <div className="app_content">
            <CreateAccount> </CreateAccount>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
