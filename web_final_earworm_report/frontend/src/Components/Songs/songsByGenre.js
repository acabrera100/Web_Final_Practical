import React, { Component } from "react";
import axios from "axios";

class SongsByGenre extends Component {
  constructor() {
    super();
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

  populateSelectGenres = () => {
    let genreList = this.state.genres.map((genre, i) => {
      return <option key={i}> {genre.genre_name}</option>;
    });
    return (
      <>
        <form>
          <select className="button" onClick={this.handleSelect}>
            <option value=""> </option>

            {genreList}
          </select>
          <input type="submit" onSubmit={this.handleFormSubmit} />
        </form>
      </>
    );
  };

  render() {
    console.log(this.state);

    return <>{this.populateSelectGenres()}</>;
  }
}
export default SongsByGenre;

//
//   let genreList = this.state.genres.map(genre => {
//     return (
//       <option
//         key="genre.id"
//         name="selectedGenre"
//         value={this.state.genre_name}
//       >
//         {genre}
//       </option>
//     );
//   });
//   return (
//     <>
//       <form>
//         <select>{genreList}</select>
//       </form>
//     </>
//   );
// }
