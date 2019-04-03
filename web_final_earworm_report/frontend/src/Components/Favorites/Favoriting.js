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

  favoriteASong = (e) => {
    // debugger
    let changeButtonPlaceholder =
      this.state.toggle === "Favorite" ? "UnFavorite" : "Favorite";
    this.setState({
      toggle: changeButtonPlaceholder
    });
    e.preventDefault();
    if (!this.state.liked) {
      this.setState({
        liked: true
      });
      axios
        .post(`/favorites`, {
          user_id: this.state.sampleUser,
          song_id: this.props.songID
        })
        .then(res => {
          console.log(res.data);
          console.log(this.props)
          debugger

        });
    } else {
      debugger
      axios.delete(`/favorites/${this.props.songID}/1`)
      .then(res => {
        console.log(res.data);
        this.setState({
          liked: false
        });
      })

    }
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
