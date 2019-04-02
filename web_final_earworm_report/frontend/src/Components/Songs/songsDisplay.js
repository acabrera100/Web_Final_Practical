import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../CSS/SongsDisplay.css";
import CommentArea from '../Comments/commentArea.js'

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
      inputTextAddComment: ""
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
      toggle: changeButtonPlaceholder
    });
    e.preventDefault();
    console.log(song);
    if (!this.state.liked) {
      this.setState({
        liked: true,
        likedValue: 0
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

  // handleAddComment = (song, e) => {
  //   // e.preventDefault();
  //   axios
  //     .post(`/comments`, {
  //       comment_body: this.state.inputTextAddComment,
  //       user_id: this.state.sampleUser,
  //       song_id: song.id
  //     })
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     });
  // };

  render() {
    // console.log(this.renderComments());
    let songsList = this.props.songs.map((song, i) => {
      let boundSongClick = this.favoriteASong.bind(this, song);
      // let boundAddComment = this.handleAddComment.bind(this, song);
      // let boundItemClick = this.onSongClick.bind(this, song);

      if (song.title.toLowerCase()) {
        return (
          <div className="li-box" key={i + 1}>
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
                <CommentArea songs={song} key={song.key} id={i+1} songid={song.id}/>

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
export default SongsDisplay;
// line 120
// {this.renderSongs()}

//
// if favorite is true set it to decrease in value by 1.
// This is to show on the front end

// create an array of objects where i extrapulate the comments from each song, and then use this variable
// I switched to this, thinking it will render all on one, not seperate li's with one comment for each.
// renderComments = () => {
//   let commentsArray = [];
//   let comments = this.props.songs.forEach(comment => {
//     // comment.comment_body.push(commentsArray);
//     if (comment..length > 1) {
//       return comment.comment_body;
//     } else {
//       return null;
//     }
//   });
//   return { comments };
// };
