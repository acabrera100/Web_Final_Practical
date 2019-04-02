import React, { Component } from "react";
import axios from "axios";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "Favorite",
      sampleUser: 1,
      songs: [],
      user_id: "",
      song_id: "",
      liked: false
    };
  }
  onSongClick = (song, e) => {
    console.log(song);
    this.setState({
      [e.target.name]: e.target.value,
      id: ""
    });
  };
  favoriteASong = (song, e) => {
    let changeButtonPlaceholder =
      this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
    this.setState({
      toggle: changeButtonPlaceholder
    });
    // e.preventDefault();
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
  render() {
    return (
      <div>
        <div className="favorites">Favorites:{this.props.eachFavorite}</div>
        <button onClick={this.favoriteASong} className="myButton">
          {this.state.toggle}
        </button>
      </div>
    );
  }
}
export default Favorites;
