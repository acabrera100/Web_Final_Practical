import React, { Component } from 'react';
import SongsDisplay from './songsDisplay.js'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SongByPopularity extends Component {
  constructor(props){
    super(props)
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
      <SongsDisplay/>
      </>
    )
  }
}
export default SongByPopularity;

//       {songsList}
