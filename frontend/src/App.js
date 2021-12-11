import './App.css';
import Add2 from './Add2';
import Login from './Login';
import CreateUser from './CreateUser';

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
          <div className="add-2">
            <Add2> </Add2>
          </div>
        </Route>
        <Route exact path="/login">
          <div className="login">
            <Login> </Login>
          </div>
        </Route>
        <Route exact path="/create_user">
          <div className="createuser">
            <CreateUser> </CreateUser>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
