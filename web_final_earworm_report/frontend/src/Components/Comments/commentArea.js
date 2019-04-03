import React, { Component } from "react";
import axios from "axios";
class CommentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTextAddComment: "",
      sampleUser:1,
      songId: this.props.songid
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleAddComment = ( e) => {
    // e.preventDefault();
    console.log(this.state);
    axios
      .post(`/comments`, {
        comment_body: this.state.inputTextAddComment,
        user_id: this.state.sampleUser,
        song_id: this.state.songId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleChange = ( e) => {
    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value,
      id: ''
    });
  };
onClick=()=>{

}
  render() {
    return (
      <div className="box-6">
        <form onSubmit={this.handleAddComment} >
          <input
            className="inputComment"
            key={this.props.key}
            id={this.props.id}
            type="text"
            name="inputTextAddComment"
            value={this.state.inputTextAddComment}
            onChange={this.handleChange}
          />
          <input className="submit-button" type="submit" value="Add Comment" />
        </form>
      </div>
    );
  }
}
export default CommentArea;
