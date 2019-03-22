import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import SongByPopularity from "./songsByPopularity.js";
import SongsByGenre from "./songsByGenre.js";
import SingleSong from "./singleSong.js";
import SongsDisplay from "./songsDisplay.js";

class Songs extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      comments: [],
      formInputText: "",
      toggle: "UnFavorite",
      visible: "false"
    };
  }

  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
    axios.get("/comments").then(res => {
      return this.setState({
        comments: res.data.comments
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
    // console.log(this.state);

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
                  <ul>
                    {" "}
                    <SongsDisplay songs={this.state.songs} />{" "}
                  </ul>
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
              return <SingleSong tite={this.state.songs.title} artist={this.state.songs.artist} img_url={this.state.songs.img_url} username={this.state.comments.username} comment_body={this.state.songs.comment_body} favorites={this.state.songs.favorites} songsId={this.state.songs.id}/>;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default Songs;
