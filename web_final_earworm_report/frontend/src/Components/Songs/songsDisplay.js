import React,{Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

class SongsDisplay extends Component {
  constructor(props){
    super()
    this.state={
      sampleUser:1,
      songs:[],
      user_id:'',
      song_id:''
    }
    // this.handleCheck = this.handleCheck.bind(this)
  }
  componentDidMount() {
    axios.get("/songs").then(res => {
      return this.setState({
        songs: res.data.songs
      });
    });
  }

//   handleClick = (e) => {
//   this.setState({
//     clickedSubmit: e.target.id },() => {
//     console.log(this.state.clickedSubmit)
//   });
// }
// handleCheck(e) {
//        alert(e.target.id);
//    }
// handleClick = (data) => {
//     console.log(data);
// }
onSongClick(item, e) {
  console.log(item);
}
  favorASong = () => {
    console.log("you favoored something here");
      axios.post(`/favorites`,{
        user_id:this.state.sampleUser,
        song_id:1
      }).then(res => {
        console.log(res);
        console.log(res.data);
      });
    }

  render(){
  let songsList =  this.state.songs.map((song,i) => {
    let boundSongClick = this.onSongClick.bind(this, song)
      if (song.title.toLowerCase()) {
        return (
          <li key={i+1} id={i+1} onClick={boundSongClick}>
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
            <button onClick={this.handleClick}>Favorite</button>
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
