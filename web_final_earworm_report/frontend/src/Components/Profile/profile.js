import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import SingleProfile from "./singleProfile.js";
import "../../CSS/Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      songsByUser: [],
      genres: [],
      commentsByUser: [],
      loggedInUser: "felipe_queens",
      loggedInUserId:1,
      buttonRender: "Posted",
      songInputText: "",
      img_urlInputText: "",
      artistInputText:'',
      genreInputText:'',
      selectedGenreId: parseInt("")
    };
  }
  componentDidMount() {
    // console.log(this.state);
    axios.get("/users").then(res => {
      return this.setState({
        users: res.data.users
      });
    });
    axios.get("/songs/byUser/1").then(res => {
      return this.setState({
        songsByUser: res.data.songs
      });
    });
    axios.get("/comments/byUser/1").then(res => {
      return this.setState({
        commentsByUser: res.data.comments
      });
    });
    axios.get("/genres").then(res => {
      return this.setState({
        genres: res.data.genres
      });
    });
  }
  handleAddSong = (song, e) => {
    // e.preventDefault();
    console.log();
    axios
      .post(`/songs`, {
        title: this.state.songInputText,
        artist: this.state.artistInputText,
        img_url:this.state.img_urlInputText,
        genre_id: this.state.selectedGenreId,
        user_id: this.state.loggedInUserId
      })
      .then(res => {
        // console.log(res);
        console.log(res.data);
      });
  };

  commentsByUser = () => {
    if (this.state.songsByUser.id === this.commentsByUser.songid) {
      let commentsPostedByUser = this.state.commentsByUser.map((comment, i) => {
        return <li key={i + 1}>{comment.comment_body}</li>;
      });
      return (
        <>
          <ul>{commentsPostedByUser}</ul>
        </>
      );
    } else {
      return <h4> hello</h4>;
    }
  };
  songsByUser = () => {
  
    let songsPostedByUser = this.state.songsByUser.map((song, i) => {
      return (
        <li key={i + 1}>
          Id:{song.id}
          <img src={song.img_url} alt="song" />
          Song Title: {song.title}
          <br />
          {song.likes} {"  "} Favorites
          {this.commentsByUser()}
        </li>
      );
    });
    return (
      <>
        <ul>{songsPostedByUser}</ul>
      </>
    );
  };
  handleSelect = e => {
    // debugger
    // console.log("ok something worked", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted: false
    });
  };
  transform = () => {
    let toggleButton =
      this.state.buttonRender === "Posted" ? "Favorites" : "Posted";

    this.setState({
      buttonRender: toggleButton
    });
  };

  populateSelectButtonsProfile = () => {
    if (this.state.buttonRender === "Posted") {
      return (
        <div className="profile-container">
          <h1 className="loggedInUser"> {this.state.loggedInUser} </h1>
          <div className="grid-container">
            <div className="posts">
              <button
                className="buttons"
                onClick={this.transform}
                name="Posted"
              >
                Posted
              </button>
            </div>
            <div className="favorites">
              <button
                className="buttons"
                onClick={this.transform}
                name="Favorites"
              >
                Favorites
              </button>
            </div>
          </div>
          <div className="grid-container2">
            <div className="htag">
              <h4>Submit New Song </h4>
            </div>
            <div className="submit-form">
              <form onSubmit={this.handleAddSong}>

                <input
                  className="inputs"
                  type="text"
                  name='songInputText'
                  value={this.state.songInputText}
                  placeholder="Song Title"
                  onChange={this.handleSelect}

                />{" "}
                <input
                  className="inputs"
                  type="text"
                  value={this.state.img_urlInputText}
                    name='img_urlInputText'
                  placeholder="Img_Url"
                  onChange={this.handleSelect}

                />
                <input
                  className="inputs"
                  type="text"
                  value={this.state.artistInputText}
                  name='artistInputText'
                  placeholder="Artist"
                  onChange={this.handleSelect}
                />
                <input
                  className="inputs"
                  type="text"
                  value={this.state.genreInputText}
                  name='genreInputText'
                  placeholder="Genre"
                  onChange={this.handleSelect}
                />
                <button className="submitbtn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
          {this.songsByUser()}
        </div>
      );
    } else {
      return (
        <div className="profile-container">
          <h1 className="loggedInUser"> {this.state.loggedInUser} </h1>
          <button onClick={this.transform} name="Posted">
            Posted
          </button>{" "}
          <button onClick={this.transform} name="Favorites">
            Favorites
          </button>
          <h4>Favorite Songs from this User </h4>

        </div>
      );
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="profileBody">
        <Switch>
          <Route
            exact
            path="/profile/:id"
            render={() => {
              return <SingleProfile />;
            }}
          />
        </Switch>
        {this.populateSelectButtonsProfile()}
      </div>
    );
  }
}

export default Profile;
