import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <nav className='nav'>
          <>
          <h1 className='left'>EarWorm Report</h1>
          </>
          <Link to="/" className='link'>Home</Link>
          <Link to="/songs"className='link'> All Songs</Link>
          <Link to="/songs/byPopularity"className='link'>By Popularity</Link>
          <Link to="/songs/byGenre"className='link'>By Genre</Link>
          <Link to="/profile"className='link'>My Profile</Link>
        </nav>
      </>
    );
  }
}

export default Navbar;
