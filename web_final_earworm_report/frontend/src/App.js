import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Components/Home/home.js";
import Songs from "./Components/Songs/songs.js";
import Profile from "./Components/Profile/profile.js";
//consider moving navbar to its own componenet and using
// NavLink.

// Overall your app looks like it's coming along, however
// it's still missing the majority of interactive functionality.
// Users need to be able to favorite, unfavorite, comment, and add songs.
// Please add this functionality.
// Also, styling is a ways off of where it needs to be. Please
// style to specifications listed in assessment guidlines. 

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/songs"> All Songs</Link>
          <Link to="/songs/byPopularity">By Popularity</Link>
          <Link to="/songs/byGenre">By Genre</Link>
          <Link to="/profile">My Profile</Link>
        </nav>
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
