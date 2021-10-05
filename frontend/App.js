import './App.css';
import SingleYear from './SingleYear/SingleYear';
import TenYear from './TenYear/TenYear';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="top-level-box">
        <div className="App">
          <header className="App-header">
            <h1>
              Taxes and Growth Model
            </h1>
            <Link to="/">
              <button type="button"> Single Year Run </button>
            </Link>
            <Link to="/tenyear">
              <button type="button"> Ten Year Run </button>
            </Link>
          </header>
        </div>
        <br />
      </div>
      <Switch>
        <Route exact path="/">
          <div className="single-year">
            <SingleYear > </SingleYear>
          </div>
        </Route>
        <Route path="/tenyear">
          <div className="ten-year">
            <TenYear className="ten-year"> </TenYear>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
