import React, { Component } from "react";
// import SongsDisplay from "./songsDisplay.js";

class SongsByGenre extends Component {
  constructor() {
    super();
    this.state = {
      selectedGenre: "",
      formSubmitted: false
    };
  }

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({
      formSubmitted: true
    });
  };
  render() {
    console.log(this.state.genreLists);

    let genreList = this.props.genres.map(genre => {
      return (
        <option name="selectedGenre " value={genre}>
          {genre}
        </option>
      );
    });
    return (
      <>
        <form>
          <select>{genreList}</select>
        </form>
      </>
    );

  }
}
export default SongsByGenre;
