import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SongsDisplay extends Component {
  constructor(props) {
    super();
    this.state = {
      sampleUser: 1,
      songs: [],
      user_id: "",
      song_id: "",
      liked:false
    };
  }
  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }

  favoriteASong(item, e) {
    console.log(item);
    if (!this.state.liked){
      this.setState({
        liked : !this.state.liked
      })
      axios
        .post(`/favorites`, {
          user_id: this.state.sampleUser,
          song_id: item.id
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    } else {
      this.setState({
        liked: false
      })
      axios
      .delete('/favorites/{item.id}')

    }

  }


  render() {
    let songsList = this.state.songs.map((song, i) => {
      let boundSongClick = this.favoriteASong.bind(this, song);
      if (song.title.toLowerCase()) {
        return (
          <li key={i + 1} id={i + 1}>
            Title: {song.title}
            <br />
            Artist: {song.artist}
            <br />
            <img src={song.img_url} alt="song" />
            <br />
            Posted by:
            <Link to={"/profile/" + song.id}>{song.username}</Link>
            <br />
            {song.favorites}
            <button onClick={boundSongClick}>Favorite</button>
            <form>
              <input type="text" />
              <input type="submit" />
            </form>
            {song.comment_body}
          </li>
        );
      } else {
        return null;
      }
    });
    return <>{songsList}</>;
  }
}
export default SongsDisplay;
