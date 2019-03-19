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
    const filteredsongs = this.state.songs.filter(el => {
      return el.title
        .toLowerCase()
        .includes(this.state.formInputText.toLowerCase());
    });

    this.setState({
      songs: filteredsongs
    });
  };

  render() {
    console.log(this.state);

    let songsList = this.state.songs.map(song => {
      if (song.title.toLowerCase()) {
        return (
          <li key={song.id}>
            Title: {song.title}
            <br />
            Artist: {song.artist}
            <br />
            <img src={song.img_url} alt="song" />
            <br />
            Posted by:
            <Link to={"/profile/" + song.id}>{song.username}</Link>
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
