import React from "react";
import "../../CSS/SongsbyGenre.css";

const GenreSelect = ({
  genres,
  handleSelect,
  handleFormSubmit,
  handleSubmit,
  handleChange,
  selectedGenre
}) => {
  let genreList = genres.map(genre => {
    return (
      <option key={genre.id} name="selectedGenre" value={genre.genre_name}>
        {" "}
        {genre.genre_name}
      </option>
    );
  });
  return (
    <div className="select-buttonArea">
      <form onSubmit={handleSubmit} onChange={handleSelect} >
        <select
          className="select"
          name="selectedGenre"

          // value={selectedGenre}
        >
          <option key="0" name="selectedGenre" value="">
            {" "}
          </option>
          {genreList}
        </select>
        <input className="submit-button" value="Select" type="submit" />
      </form>
    </div>
  );
};

export default GenreSelect;
