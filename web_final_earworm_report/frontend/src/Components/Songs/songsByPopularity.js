import React, { Component } from 'react';

class SongByPopularity extends Component {
  constructor(){
    super()
    this.state={

    }
  }
  
  render(){
    console.log(this.props.songs);
    return (
      <>
        <h2>By Popularity</h2>
        <h4>
          Songs should include favorites, comments, and their
          accompanying functionalities - exactly as described in the
          /songs route above.
        </h4>
      </>
    )
  }
}
export default SongByPopularity
