import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

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
            return (
              <>
                <h2>By Popularity</h2>
                <h4>
                  Songs should include favorites, comments, and their
                  accompanying functionalities - exactly as described in the
                  /songs route above.
                </h4>
              </>
            );
          }}
        />
        <Route
          path="/songs/byGenre"
          render={() => {
            return (
              <>
                <h2>By Genre</h2>
                <ul>
                  <li>
                    At first, this route should look exactly like /songs, sorted
                    by post date, and with each song including favorites, likes,
                    and their accompanying functionalities.
                  </li>
                  <li>
                    However, there should be a select input in the form instead
                    of a text input. By default, this should be blank,
                    displaying all songs. It should be populated with option
                    tags representing each genre in the Genres table of your
                    database.
                  </li>
                  <li>
                    When the user selects a specific genre and submits the form,
                    the feed should update to only include songs from the genre
                    that the user selected.
                  </li>
                </ul>
              </>
            );
          }}
        />
      </Switch>
    );
  }
}

export default Songs;
