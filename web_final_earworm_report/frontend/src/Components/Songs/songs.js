import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SongByPopularity from "./songsByPopularity.js";
import SongsByGenre from "./songsByGenre.js";
import SingleSong from "./singleSong.js";

class Songs extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/songs"
          render={() => {
            return <h1>Songs</h1>;
          }}
        />
        <Route
          path="/songs/byPopularity"
          render={() => {
            return <SongByPopularity />;
          }}
        />
        <Route
          path="/songs/byGenre"
          render={() => {
            return <SongsByGenre />;
          }}
        />
        <Route
          exact
          path="/songs/:id"
          render={() => {
            return <SingleSong />;
          }}
        />
      </Switch>
    );
  }
}

export default Songs;
