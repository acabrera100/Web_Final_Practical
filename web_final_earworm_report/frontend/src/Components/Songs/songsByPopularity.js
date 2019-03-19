import React, { Component } from 'react';
// import SongsDisplay from './songsDisplay.js'
import { Link } from 'react-router-dom'

class SongByPopularity extends Component {
  constructor(){
    super()
    this.state={

    }
  }

  render(){
  let songsList =  this.props.songs.map(song => {
      if (song.title.toLowerCase()) {
        return (
          <li key={song.com}>
            Title: {song.title}
            <br />
            Artist: {song.artist}
            <br />
            <img src={song.img_url} alt="song" />
            <br />
            Posted by:
            <Link to={"/profile/" + song.id}>{song.username}</Link>
            <br />
            {song.favorites}
            <button onClick={this.favorASong}>Favorite</button>
            <form>
              <input type="text" />
              <input type="submit" />
            </form>
          </li>
        );
      } else {
        return null;
      }
    });
    return(
      <>
      {songsList}
      </>
    )
  }
}
export default SongByPopularity;
