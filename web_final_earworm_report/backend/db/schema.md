Database Structure
The following tables and columns will be necessary.

Users
<!-- -id -->
<!-- -username - Unique -->

Genres
<!-- -id -->
<!-- -genre_name - Unique -->

Songs
<!-- -id -->
<!-- -title -->
<!-- -img_url -->
<!-- -user_id - References Users -->
<!-- -genre_id - References Genres -->

Favorites
<!-- -id -->
<!-- -user_id - References Users -->
<!-- -song_id - References Songs -->

Comments
<!-- -id -->
<!-- -comment_body -->
<!-- -user_id - References Users -->
<!-- -song_id - References Songs -->

-Create an .sql file to create these tables and seed this database with at least
<!-- -10 users,  -->
<!-- -5 genres, -->
<!-- - 15 songs, -->
<!-- -40 favorites, -->
<!-- -and 20 comments. -->
-Your first user should be your sample user - the user that we will automatically be logged-in as.
