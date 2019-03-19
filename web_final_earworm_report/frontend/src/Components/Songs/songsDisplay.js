import React,{Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

class SongsDisplay extends Component {
  constructor(props){
    super()
    this.state={
      songs:[]
    }
  }
  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }
  render(){
  let songsList =  this.state.songs.map((song,i) => {
      if (song.title.toLowerCase()) {
        return (
          <li key={i+1}>
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
            {song.comment_body}
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
export default SongsDisplay;
