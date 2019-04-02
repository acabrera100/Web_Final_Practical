import React, { Component } from "react";
import axios from "axios";
class CommentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleAddComment = (song, e) => {
    // e.preventDefault();
    axios
      .post(`/comments`, {
        comment_body: this.state.inputTextAddComment,
        user_id: this.state.sampleUser,
        song_id: song.id
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  onSongClick = (song, e) => {
    console.log(song);
    this.setState({
      [e.target.name]: e.target.value,
      id: ""
    });
  };
  render() {
    return (
      <div className="box-6">
        <form onSubmit={this.handleAddComment}>
          <input
            className="inputComment"
            key={this.props.key}
            id={this.props.id}
            type="text"
            name="inputTextAddComment"
            value={this.state.inputTextAddComment}
            onChange={this.onSongClick}
          />
          <input className="submit-button" type="submit" value="Add Comment" />
        </form>
      </div>
    );
  }
}
export default CommentArea;
