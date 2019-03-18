import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import SongByPopularity from "./songsByPopularity.js";
import SongsByGenre from "./songsByGenre.js";
import SingleSong from "./singleSong.js";

class Songs extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      formInputText: ""
    };
  }

  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }

  handleChange = e => {
    this.setState({ formInputText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let songSearched = this.state.songs.find(song => {
      return (
        song.name
          .toLowerCase()
          .indexOf(this.state.formInputText.toLowerCase()) === 0
      );
    });
    this.state.history.push(`/songs/${songSearched.id}/singleSong`);
  };
  render() {
    console.log(this.state);

    let songsList = this.state.songs.map(song => {
      if (
        song.title
          .toLowerCase()
          .indexOf(this.state.formInputText.toLowerCase()) === 0
      ) {
        return (
          <li key={song.id}>
            <Link to={"/songs/" + song.id}>{song.title}</Link>
          </li>
        );
      } else {
        return null;
      }
    });
    return (
      <>
        <Switch>
          <Route
            exact
            path="/songs"
            render={() => {
              return (
                <>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      placeholder="Search"
                      value={this.state.formInputText}
                      onChange={this.handleChange}
                    />
                    <input type="submit" value="Search by Title" />
                  </form>
                  <h1> All Songs</h1>
                  <ul>{songsList}</ul>
                </>
              );
            }}
          />
          <Route
            path="/songs/byPopularity"
            render={() => {
              return <SongByPopularity songs={this.state.songs} />;
            }}
          />
          <Route
            path="/songs/byGenre"
            render={() => {
              return <SongsByGenre songs={this.state.songs} />;
            }}
          />
          <Route
            exact
            path="/songs/:id"
            render={() => {
              return <SingleSong songs={this.state.songs} />;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default Songs;
