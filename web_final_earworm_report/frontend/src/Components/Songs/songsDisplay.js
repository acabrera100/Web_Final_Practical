import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../CSS/SongsDisplay.css";

class SongsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleUser: 1,
      songs: [],
      user_id: "",
      song_id: "",
      liked: false,
      toggle: "Favorite",
      inputTextAddComment:''
    };
  }
  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }

  favoriteASong = (song, e) => {
    let changeButtonPlaceholder =
      this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
    this.setState({
      toggle: changeButtonPlaceholder,

    });
    e.preventDefault();
    console.log(song);
    if (!this.state.liked) {
      this.setState({
        liked: true,
        likedValue:0
      });
      axios
        .post(`/favorites`, {
          user_id: this.state.sampleUser,
          song_id: song.id
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    } else {
      this.setState({
        liked: false
      });
      axios.delete(`/favorites/${song.id}`).then(res => {
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

  onSongClick = (song, e) => {
    console.log(song);
    this.setState({
      [e.target.name]: e.target.value,
      id: ""
    });
  };

  handleAddComment = (song, e) => {
    // e.preventDefault();
    axios
      .post(`/comments`, {
        comment_body: this.state.inputTextAddComment,
        user_id: this.state.sampleUser,
        song_id: song.id
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
// renderSongs=()=>{
//   create an array of objects where i extrapulate the comments from each song, and then use this variable
// let commentArray = this.props.songs.map(comment)=>{
//   song.id === comments.song.id
// }
// return <li>commentArray</li>
// }
  render() {
    let songsList = this.props.songs.map((song, i) => {
      let boundSongClick = this.favoriteASong.bind(this, song);
      let boundAddComment = this.handleAddComment.bind(this, song);
      let boundItemClick = this.onSongClick.bind(this, song);
      console.log(this.state.comment_body);

      if (song.title.toLowerCase()) {
        return (
          <div className="li-box" key={i+1}>
            <li key={i + 1} id={i + 1} className="songBox">
              <div className="box-1">
                <img src={song.img_url} alt="thumbnail" className="thumbnail" />
              </div>
              <div className="box-2">
                <div>{song.title}</div>
                <div className="favorites">Favorites:{song.favorites}</div>
                <button onClick={boundSongClick} className="myButton">
                  {this.state.toggle}
                </button>
              </div>
              <div className="box-3">
                Posted by:
                <Link to={"/profile/" + song.id}>{song.username}</Link>
              </div>
              <div className="box-4">{song.comment_body}</div>
              <div className="box-6">
                <form onSubmit={boundAddComment}>
                  <input
                    className="inputComment"
                    key={song.key}
                    id={i + 1}
                    type="text"
                    name="inputTextAddComment"
                    value={this.state.inputTextAddComment}
                    onChange={boundItemClick}
                  />
                  <input
                    className="submit-button"
                    type="submit"
                    value="Add Comment"
                  />
                </form>
              </div>
            </li>
          </div>
        );
      } else {
        return null;
      }
    });
    return <>{songsList}</>;
  }
}
export default SongsDisplay;
// \ine 118
// {this.renderSongs()}

//
// if favorite is true set it to decrease in value by 1.
// This is to show on the front end
