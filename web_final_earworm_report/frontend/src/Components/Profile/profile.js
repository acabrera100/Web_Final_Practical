import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import SingleProfile from "./singleProfile.js";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loggedInUser: "felipe_queens",
      buttonRender: "Posted"
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
        sampleStateSongsByUser: res.data
      });
    });
  }
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
            <input type="text" placeholder="Img_Url" /> {" "}
            <input type ="submit" />
          </form>
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
