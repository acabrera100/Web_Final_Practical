Frontend Routing
You should have the following routes on your frontend:

<!-- - / - A homepage that reads "Earworm Report" in an h1 tag. -->

<!-- - Also renders a navigation bar across the top of the page, visible on every subsequent route. -->
<!-- - Navbar should have the following links: "Home," "All Songs," "By Popularity," "By Genre," and "My Profile". -->


<!-- - /songs - AKA "All Songs."   -->
    <!-- - A page that renders all of the songs on the site, as well as offering search functionality by song title. Songs should, by default, be sorted how recently they were posted. -->
  <!-- - Includes a form tag containing a text input and a submit button. Label - "Search By Title." -->
  <!-- - When a user enters part or all of a song's title (not case sensitive) and clicks "Search" (submit), the list of songs should be filtered to only the songs with titles that correspond to what the user was searching for. -->
  <!-- - Each song should include title, image (based on the img_url column in the Songs table), and total number of favorites. They should also include the user's username, -->
  <!-- - which should be a link to that user's profile (/profile/:id). -->
  - Each song should include a button, "Favorite," that allows the user to favorite a specific song.
  - When the user clicks to favorite a song, the button's text should change to "Unfavorite", and the button's functionality should change from sending a POST request to a DELETE.
  - Ensure that the song's total number of favorites always reflects the user's input.
  - Each song should include a comment section underneath the song title, displaying all comments for that song. Comments should include the user who submitted them.

- Clicking on their username should link you to that user's profile page (/profile/:id).
- Underneath each list of comments, there should be a form tag with a text input and a submit button that reads: "Add Comment."
- When the user submits this form, they should POST a new comment to the song. The list of comments should then reflect this new comment on the frontend.



<!-- - /songs/bypop - AKA "By Popularity."  -->
  - A list of all songs sorted by number of favorites. No search functionality required.
  - Songs should include favorites, comments, and their accompanying functionalities - exactly as described in the /songs route above.



<!-- - /songs/bygenre - AKA "By Genre." -->
  - At first, this route should look exactly like /songs, sorted by post date, and with each song including favorites, likes, and their accompanying functionalities.
  - However, there should be a select input in the form instead of a text input. By default, this should be blank, displaying all songs. It should be populated with option tags representing each genre in the Genres table of your database.
  -   When the user selects a specific genre and submits the form, the feed should update to only include songs from the genre that the user selected.


<!-- - /profile - AKA "My Profile."  -->
    - The logged-in user's profile. On the top of the screen, in a header tag of your choice, should be the user's username.
  - Below this, there should be two buttons next to each other - "Posted" and "Favorites." One or the other should be highlighted (with a distinctive background color) depending on which one is selected. By default, "Posted" should be selected.
  - Below this should be a feed with all of the songs the user posted, if "Posted" is selected, or that the user favorited, if "Favorites" is selected. These song items should look and behave as described in the /songs route.
  - If "Posted" is selected, above this feed, there should be a form where a user may submit a new song. This form should have text inputs for a song's title and image URL (use Google Images results for image URLs).
  -  When the form is submitted, submit a POST request to the backend, add it to the Songs table of your database, and ensure that all frontend feeds reflect the new song.


<!-- - /profile/:id  -->
  - Any other user's profile. This route is accessed by clicking on a user's username, and is identical to the /profile route, with one exception - you should not be able to post a new song from another user's profile.
