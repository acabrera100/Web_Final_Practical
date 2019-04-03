import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import SongsDisplay from './songsDisplay.js'
import Favorites from "../Favorites/Favoriting.js";
import CommentArea from "../Comments/commentArea.js";

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
    let songsList = this.state.songs.map((song, i) => {
      if (song.title.toLowerCase()) {
        return (
          <div className="li-box" key={i + 1}>
            <li key={i + 1} id={i + 1} className="songBox">
              <div className="box-1">
                <img src={song.img_url} alt="thumbnail" className="thumbnail" />
              </div>
              <div className="box-2">
                <div>{song.title}</div>
                <Favorites eachFavorite={song.favorites} songID={song.song_id} />
              </div>
              <div className="box-3">
                Posted by:
                <Link to={"/profile/" + song.id}>{song.username}</Link>
              </div>
              <div className="box-4">{song.comment_body}</div>
              <div className="box-6">
                <CommentArea
                  songs={song}
                  key={song.key}
                  id={i + 1}
                  songid={song.id}
                />
              </div>
            </li>
          </div>
        );
      } else {
        return null;
      }
    });

    return (
      <>
        {songsList}
        {this.commentArray}
      </>
    );
  }
}

export default SongByPopularity;
