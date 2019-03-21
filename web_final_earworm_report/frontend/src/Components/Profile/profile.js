import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import SingleProfile from "./singleProfile.js";
import "../../CSS/Profile.css"

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      sampleStateSongsByUser:[],
      sampleStateCommentsByUser:[],
      loggedInUser: "felipe_queens",
      buttonRender: "Posted",
      songInputText: "",
      img_urlInputText: ""
    };
  }
  componentDidMount() {
    axios.get("/users").then(res => {
      return this.setState({
        users: res.data.users
      });
    });
    axios.get("/songs/byUser/1").then(res => {
      return this.setState({
        sampleStateSongsByUser: res.data.songs
      });
    });
    axios.get("/comments/byUser/1").then(res => {
      return this.setState({
        sampleStateCommentsByUser: res.data.comments
      });
    });
  }

  songsByUser = () => {
    let songsPostedByUser = this.state.sampleStateSongsByUser.map((song, i) => {
      return (
        <li key={i + 1}>
        Id:{song.id}
        <img src={song.img_url} alt="song" />
          Song Title: {song.title}
          <br/>
          {song.likes} {"  "} Favorites
        </li>
      );
    });
    return (
      <>
      <ul>
      {songsPostedByUser}
      </ul>
      </>
    );
  };
commentsByUser = () => {
    let commentsPostedByUser = this.state.sampleStateCommentsByUser.map((comment, i) => {
      return (
        <li key={i + 1}>
         {comment.comment_body}
        </li>
      );
    });
    return (
      <>
      <ul>
      {commentsPostedByUser}
      </ul>
      </>
    );
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
        <>
          <button onClick={this.transform} name="Posted">
            Posted
          </button>{" "}
          <button onClick={this.transform} name="Favorites">
            Favorites
          </button>
          <h4>Submit New Song </h4>
          <form>
            <input type="text" placeholder="Song Title" />{" "}
            <input type="text" placeholder="Img_Url" /> <input type="submit" />
          </form>
          {this.songsByUser()}
          {this.commentsByUser()}
        </>
      );
    } else {
      return (
        <>
          <button onClick={this.transform} name="Posted">
            Posted
          </button>{" "}
          <button onClick={this.transform} name="Favorites">
            Favorites
          </button>
          <h4>Favorite Songs from this User </h4>
        </>
      );
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Switch>
          <Route
            exact
            path="/profile/:id"
            render={() => {
              return <SingleProfile />;
            }}
          />
        </Switch>
        <h1> {this.state.loggedInUser} </h1>
        {this.populateSelectButtonsProfile()}
      </>
    );
  }
}

export default Profile;
