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
      liked: false,
      toggle: "Favorite",
      inputTextAddComment: ""
    };
this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  favoriteASong = (item, e) => {
    let changeButtonPlaceholder =
      this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
    this.setState({
      toggle: changeButtonPlaceholder
    });
    e.preventDefault();
    console.log(item);
    if (!this.state.liked) {
      this.setState({
        liked: true
      });
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
      });
      axios.delete(`/favorites/${item.id}`).then(res => {
        console.log(res.data);
      });
    }
  };
  toggleFavoriteButton = () => {
    let changeButtonPlaceholder =
      this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
    this.setState({
      toggle: changeButtonPlaceholder
    });
  };

  handleAddComment = (item, e) => {
    e.preventDefault();
    axios
      .post(`/comments`, {
        comment_body: this.state.inputTextAddComment,
        user_id: this.state.sampleUser,
        song_id: item.id
      })
.then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    let songsList = this.state.songs.map((song, i) => {
      let boundSongClick = this.favoriteASong.bind(this, song);
      let boundAddComment = this.handleAddComment.bind(this, song);


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
            <button onClick={boundSongClick}>{this.state.toggle}</button>
            <form onSubmit={boundAddComment}>
              <input

                id={i + 1}
                type="text"
                name="inputTextAddComment"
                value={this.state.inputTextAddComment}
                placeholder={"Add a Comment"}
                onChange={this.handleChange}
              />
              <input type="submit" value="Submit" />
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
