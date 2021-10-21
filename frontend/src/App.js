import './App.css';
import Add2 from './Add2';

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
      </Switch>
    </Router>
  );
}

export default App;
