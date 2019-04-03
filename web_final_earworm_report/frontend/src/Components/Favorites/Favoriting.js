import React, { Component } from "react";
import axios from "axios";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "Favorite",
      sampleUser: 1,
      user_id: "",
      liked: false
    };
    this.favoriteASong = this.favoriteASong.bind(this);
  }

  favoriteASong = song => {
    // debugger
    // console.log("attempt to favorite");
    let changeButtonPlaceholder =
      this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
    this.setState({
      toggle: changeButtonPlaceholder
    });
    // e.preventDefault();
    console.log(song);
    if (!this.state.liked) {
      this.setState({
        liked: true
      });
      axios
        .post(`/favorites`, {
          user_id: this.state.sampleUser,
          song_id: 1
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
