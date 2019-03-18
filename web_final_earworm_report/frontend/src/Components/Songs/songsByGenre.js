import React, { Component } from 'react';

class SongsByGenre extends Component {
  render(){
      console.log(this.props.songs);
    return (
      <>
        <h2>By Genre</h2>
        <ul>
          <li>
            At first, this route should look exactly like /songs, sorted
            by post date, and with each song including favorites, likes,
            and their accompanying functionalities.
          </li>
          <li>
            However, there should be a select input in the form instead
            of a text input. By default, this should be blank,
            displaying all songs. It should be populated with option
            tags representing each genre in the Genres table of your
            database.
          </li>
          <li>When the user selects a specific genre and submits the form, the feed should update to only include songs from the genre that the user selected.</li>
        </ul>
      </>
    )
  }
}
export default SongsByGenre
