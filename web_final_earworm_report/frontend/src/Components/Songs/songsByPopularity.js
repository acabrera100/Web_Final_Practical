import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SongsDisplay from './songsDisplay.js'

class SongByPopularity extends Component {
  constructor() {
    super();
    this.state = {
      sampleUser: 1,
      songs: [],
      user_id: "",
      song_id: "",
      liked: false,
      toggle: "Favorite",
      inputTextAddComment: ""
    };
  }
  componentDidMount() {
    axios.get("/songs/byPop").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }



  render() {

    return <><SongsDisplay/></>;
  }
}
export default SongByPopularity;
