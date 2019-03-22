import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import SongByPopularity from "./songsByPopularity.js";
import SongsByGenre from "./songsByGenre.js";
import SingleSong from "./singleSong.js";
import SongsDisplay from "./songsDisplay.js";
import "../../CSS/AllSongs.css";
class Songs extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      comments: [],
      formInputText: "",
      toggle: "UnFavorite",
      visible: "false",
      searched:false
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
  if(this.state.searched === true ){
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
    this.setState({
      searched:false,
    })
  }else {
    const filteredsongs = this.state.songs.filter(el => {
      return el.title
        .toLowerCase()
        .includes(this.state.formInputText.toLowerCase());
    });

    this.setState({
      songs: filteredsongs,
      searched:true,
      formInputText:''
    });
  }
  };

  render() {
    console.log(this.state);

    return (
      <>
        <Switch>
          <Route
            exact
            path="/songs"
            render={() => {
              return (
                <div className="AllSongsBody">
                  <div className="container">
                    <div className="searchbyTitle">
                      <h1 className="h1"> Search by Title</h1>
                      <form onSubmit={this.handleSubmit}>
                        <input
                          className="search-button"
                          type="text"
                          value={this.state.formInputText}
                          onChange={this.handleChange}
                        />
                        <input type="submit" value="Search" />
                      </form>
                    </div>
                    <ul>
                      {" "}
                      <SongsDisplay songs={this.state.songs} />{" "}
                    </ul>
                  </div>
                </div>
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
              return (
                <SingleSong
                  tite={this.state.songs.title}
                  artist={this.state.songs.artist}
                  img_url={this.state.songs.img_url}
                  username={this.state.comments.username}
                  comment_body={this.state.songs.comment_body}
                  favorites={this.state.songs.favorites}
                  songsId={this.state.songs.id}
                />
              );
            }}
          />
        </Switch>
      </>
    );
  }
}

export default Songs;
