import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Components/Home/home.js";
import Songs from "./Components/Songs/songs.js";


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/songs">Songs</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} /> {"  "}
          <Route exact path="/songs" component={Songs} />
        </Switch>
      </div>
    );
  }
}

export default App;
