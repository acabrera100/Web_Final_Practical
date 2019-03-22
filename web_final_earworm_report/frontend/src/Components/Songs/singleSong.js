import React from "react";
import { Link } from "react-router-dom";

const SingleSong = ({
  title,
  artist,
  img_url,
  username,
  comment_body,
  favorites,
  songsId
}) => {

  return (
    <>
      Title: {title}
      <br />
      Artist: {artist}
      <br />
      <img src={img_url} alt="this.props.songs" />
      <br />
      Posted by:
      <Link to={"/profile/" + songsId}>{username}</Link>
      <br />
      {favorites}
      <form>
        <input type="text" />
        <input type="submit" />
      </form>
      {comment_body}
    </>
  );
};
export default SingleSong;
//   <button>{this.state.toggle}</button>
