// This page is working better than before. 
// However I don't want all the songs to come back on
// the change. I just want to see filtered results
// on the sumbit. Then when I change, nothing should
// change until I hit submit again.

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../CSS/SongsbyGenre.css";



class SongsByGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      songs:[],
      selectedGenre: "",
      formSubmitted: false,
      sampleUser: 1,
      user_id: "",
      song_id: "",
      liked: false,
      toggle: "Favorite",
      inputTextAddComment: ""
    };
  }

  componentDidMount() {
    axios.get("/genres").then(res => {
      return this.setState({
        genres: res.data.genres
      });
    });
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
        liked: true
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


  handleSelect = e => {
  // debugger
    // console.log("ok something worked", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted:false
    });
  };

  handleFormSubmit = e => {
    // debugger
    e.preventDefault();
    // console.log("hello");
    this.setState({
      formSubmitted: true
    });
  };

  populateSelectGenres = () => {
    let genreList = this.state.genres.map((genre, i) => {
      return (
        <option key={i + 1} name="selectedGenre" value={genre.genre_name}>
          {" "}
          {genre.genre_name}
        </option>
      );
    });
    return (
      <div className='select-buttonArea'>
        <form onSubmit={this.handleFormSubmit}>
          <select className='select'name="selectedGenre"  onChange={this.handleSelect}>
            <option key="0" name="selectedGenre" value="">
              {" "}
            </option>
            {genreList}
          </select>
          <button type="submit" className='submit-button'>Sort byGenre</button>
        </form>
      </div>
    );
  };

  render() {
    // console.log(this.state);
    const {selectedGenre,formSubmitted} =this.state
    const { songs } = this.props;
    let songsFilter = this.state.songs;

    if (formSubmitted && selectedGenre) {
      songsFilter = songs.filter(song => {
        return song.genre_name === selectedGenre;
      });
    }


    let songsList = songsFilter.map((song, i) => {
      let boundSongClick = this.favoriteASong.bind(this, song);
      let boundAddComment = this.handleAddComment.bind(this, song);
      let boundItemClick = this.onSongClick.bind(this, song);

      if (song.title.toLowerCase()) {
        return (
          <div className='Body' key={i+1}>
          <div className="container">
          <div className="li-box" key={i+1}>
          <ul>
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
            </ul>
          </div>
          </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <>
        {this.populateSelectGenres()}
        {songsList}

      </>
    );
  }
}

export default SongsByGenre;

// if (this.state.formSubmitted && this.state.selectedGenre) {
//   genreFilter ===
//     this.props.songs.filter(song => {
//       return song.genre === this.state.selectedGenre;
//     });
// }
