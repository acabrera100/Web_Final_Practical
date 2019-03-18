import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from 'axios'
import SongByPopularity from "./songsByPopularity.js";
import SongsByGenre from "./songsByGenre.js";
import SingleSong from "./singleSong.js";

class Songs extends Component {
  constructor (){
    super ()
    this.state = {
      songs:[]
    }
  }

  componentDidMount (){
    axios.get('/songs').then(res =>{
      return this.setState({
        songs:res.data.songs
      })
    })
  }

  render() {
    // console.log(this.state);
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
            return <SongByPopularity songs={this.state.songs} />;
          }}
        />
        <Route
          path="/songs/byGenre"
          render={() => {
            return <SongsByGenre songs={this.state.songs}/>;
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
    );
  }
}

export default Songs;
