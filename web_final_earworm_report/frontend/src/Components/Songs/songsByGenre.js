import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../CSS/SongsbyGenre.css";
import GenreSelect from "./genreSelect.js";
import CommentArea from "../Comments/commentArea.js";
import Favorites from "../Favorites/Favoriting.js";


class SongsByGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      songs: [],
      selectedGenre: "",
      formSubmitted: false,
      sampleUser: 1,
      user_id: "",
      song_id: "",
      liked: false,
      toggle: "Favorite",
      inputTextAddComment: "",
      genreOption: ""
    };
  }

  componentDidMount() {
    this.getSongs();
    this.getGenres();
  }

  getSongs = () => {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  };
  getGenres = () => {
    axios.get("/genres").then(res => {
      return this.setState({
        genres: res.data.genres
      });
    });
  };

  // favoriteASong = (song, e) => {
  //   let changeButtonPlaceholder =
  //     this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
  //   this.setState({
  //     toggle: changeButtonPlaceholder
  //   });
  //   e.preventDefault();
  //   // console.log(song);
  //   if (!this.state.liked) {
  //     this.setState({
  //       liked: true
  //     });
  //     axios
  //       .post(`/favorites`, {
  //         user_id: this.state.sampleUser,
  //         song_id: song.id
  //       })
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //       });
  //   } else {
  //     this.setState({
  //       liked: false
  //     });
  //     axios.delete(`/favorites/${song.id}`).then(res => {
  //       console.log(res.data);
  //     });
  //   }
  // };
  // toggleFavoriteButton = () => {
  //   let changeButtonPlaceholder =
  //     this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
  //   this.setState({
  //     toggle: changeButtonPlaceholder
  //   });
  // };
  //
  // onSongClick = (song, e) => {
  //   console.log(song);
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //     id: ""
  //   });
  // };
  //
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

  filterSongs = () => {
    // debugger
    const { selectedGenre } = this.state;
    axios.get(`/songs/byGenre/${selectedGenre}`).then(thing => {
      this.setState({
        songs: thing.data.songs
      });
    });
  };

  handleSubmit = e => {
    // debugger
    e.preventDefault();
    this.filterSongs();
    this.setState({
      formSubmitted: true
    });
  };

  handleSelect = e => {
    // debugger;
    console.log("ok something worked", e.target.value);
    this.setState({
      selectedGenre: e.target.value,
      formSubmitted: false
    });
  };

  render() {
    let songsList = this.state.songs.map((song, i) => {
      // let boundSongClick = this.favoriteASong.bind(this, song);
      // let boundAddComment = this.handleAddComment.bind(this, song);
      // let boundItemClick = this.onSongClick.bind(this, song);

      return (
        <div className="Body" key={i + 1}>
          <div className="container">
            <div className="li-box" key={i + 1}>
              <ul>
                <li key={i + 1} id={i + 1} className="songBox">
                  <div className="box-1">
                    <img
                      src={song.img_url}
                      alt="thumbnail"
                      className="thumbnail"
                    />
                  </div>
                  <div className="box-2">
                    <div>{song.title}</div>
                      <Favorites eachFavorite={song.favorites} />

                  </div>
                  <div className="box-3">
                    Posted by:
                    <Link to={"/profile/" + song.id}>{song.username}</Link>
                  </div>
                  <div className="box-4">{song.comment_body}</div>
                  <div className="box-6">
                    <CommentArea />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <GenreSelect
          genres={this.state.genres}
          handleSelect={this.handleSelect}
          handleFormSubmit={this.handleFormSubmit}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          selectedGenre={this.state.selectedGenre}
        />
        {songsList}
      </>
    );
  }
}

export default SongsByGenre;
