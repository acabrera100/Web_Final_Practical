import React from "react";

const Home = () => {
  return (
    <>
      <h1> My Profile </h1>
      <ul>
        <li>
          Below this, there should be two buttons next to each other - "Posted"
          and "Favorites." One or the other should be highlighted (with a
          distinctive background color) depending on which one is selected. By
          default, "Posted" should be selected.
        </li>
        <li>
          Below this should be a feed with all of the songs the user posted, if
          "Posted" is selected, or that the user favorited, if "Favorites" is
          selected. These song items should look and behave as described in the
          /songs route.
        </li>
        <li>
          If "Posted" is selected, above this feed, there should be a form where
          a user may submit a new song. This form should have text inputs for a
          song's title and image URL (use Google Images results for image URLs).
          When the form is submitted, submit a POST request to the backend, add
          it to the Songs table of your database, and ensure that all frontend
          feeds reflect the new song.
        </li>
        <li>
          /profile/:id - Any other user's profile. This route is accessed by
          clicking on a user's username, and is identical to the /profile route,
          with one exception - you should not be able to post a new song from
          another user's profile.
        </li>
      </ul>
    </>
  );
};

export default Home;
