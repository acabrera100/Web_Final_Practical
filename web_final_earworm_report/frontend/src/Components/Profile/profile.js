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
      sampleStateSongsByUser: [],
      sampleStateCommentsByUser: [],
      loggedInUser: "felipe_queens",
      buttonRender: "Posted",
      songInputText: "",
      img_urlInputText: ""
    };
  }
  componentDidMount() {
    console.log(this.state);
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
          <br />
          {song.likes} {"  "} Favorites
        </li>
      );
    });
    return (
      <>
        <ul>{songsPostedByUser}</ul>
      </>
    );
  };
  commentsByUser = () => {
    let commentsPostedByUser = this.state.sampleStateCommentsByUser.map(
      (comment, i) => {
        return <li key={i + 1}>{comment.comment_body}</li>;
      }
    );
    return (
      <>
        <ul>{commentsPostedByUser}</ul>
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
        <div className="profile-container">
          <h1 className="loggedInUser"> {this.state.loggedInUser} </h1>
          <div className="grid-container">
            <div className="posts">
              <button onClick={this.transform} name="Posted">
                Posted
              </button>
            </div>
            <div className="favorites">
              <button onClick={this.transform} name="Favorites">
                Favorites
              </button>
            </div>
          </div>
          <h4>Submit New Song </h4>
          <form>
            <input type="text" placeholder="Song Title" />{" "}
            <input type="text" placeholder="Img_Url" /> <input type="submit" />
          </form>
          {this.songsByUser()}
          {this.commentsByUser()}
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
