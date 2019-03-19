import React, { Component } from "react";
import axios from "axios";
// import SongDisplay from "./songsDisplay";

//Not propery displaying songs.
// Songs should be selected only on the submit, not on the
// change. Your's only works properly for one selection. 

class SongsByGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedGenre: "",
      formSubmitted: false
    };
  }

  componentDidMount() {
    axios.get("/genres").then(res => {
      return this.setState({
        genres: res.data.genres
      });
    });
  }

  handleSelect = e => {
    // console.log("ok something worked", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = e => {
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
      <>
        <form onSubmit={this.handleFormSubmit}>
          <select name="selectedGenre"  onChange={this.handleSelect}>
            <option key="0" name="selectedGenre" value="">
              {" "}
            </option>
            {genreList}
          </select>
          <button type="submit">Sort byGenre</button>
        </form>
      </>
    );
  };

  render() {
    // console.log(this.state);
    const {selectedGenre,formSubmitted} =this.state
    const { songs } = this.props;
    let songsFilter = songs;

    if (formSubmitted && selectedGenre) {
      songsFilter = songs.filter(song => {
        return song.genre_name === selectedGenre;
      });
    }

    let songsList = songsFilter.map((song,i) => {
      return <li key={i +1}>{song.title}</li>;
    });
    return (
      <>
        {this.populateSelectGenres()}
        <ul>{songsList}</ul>
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
