import React, { Component } from 'react';
// import SongsDisplay from './songsDisplay.js'
import { Link } from 'react-router-dom'
import axios from 'axios'

// BEWARE of duplicate code. I see A LOT of duplicate code.
// We want to keep things DRY. Although you won't
// be penalized for this today (get the functionality and styling first),
// this could / would effect whether a company will bring you
// in for an interview upon seeing the coding challenge.

// But on your way, you're on track for Friday :-). 

class SongByPopularity extends Component {
  constructor(){
    super()
    this.state={
      songsByPop:[]
    }
  }

componentDidMount(){
  axios.get("/songs/byPop").then(res => {
    return this.setState({
      songsByPop: res.data.songs
    });
  });
}
  render(){
  let songsList =  this.state.songsByPop.map((song,i) => {
      if (song.title.toLowerCase()) {
        return (
          <li key={i + 1}>
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
