import React, { Component } from "react";
import { withRouter } from 'react-router'

class SingleSong extends Component {
  render() {
      console.log(this.props.songs);
    return (
      <>
        <h3>Single Song Placed here</h3>
      </>
    );
  }
}
export default withRouter (SingleSong);
