import React from 'react';
import Navigationbar from  './Navbar';
import Game from "./Game";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
        <Navigationbar />
        <Switch>
            <Route exact path="/">
                <Game />
            </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
