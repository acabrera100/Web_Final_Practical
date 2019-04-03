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
      genreOption: "",
      filteredComments:[]
    };
  }

  componentDidMount() {
    this.getSongs();
    this.getGenres();
  }
  // componentDidUpdate(){
  //   this.getSongs()
  // }

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

  filterSongs = () => {
    console.log(this.state);
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
                    <Favorites eachFavorite={song.favorites} songID={song.id} />
                  </div>
                  <div className="box-3">
                    Posted by:
                    <Link to={"/profile/" + song.id}>{song.username}</Link>
                  </div>
                  <div className="box-4">{song.comments}</div>
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
