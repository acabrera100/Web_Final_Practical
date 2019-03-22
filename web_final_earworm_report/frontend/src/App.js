import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/home.js";
import Songs from "./Components/Songs/songs.js";
import Profile from "./Components/Profile/profile.js";
import Navbar from './Components/Navbar/navbar.js'
import "./CSS/App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} /> {"  "}
          <Route path="/songs" component={Songs} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
