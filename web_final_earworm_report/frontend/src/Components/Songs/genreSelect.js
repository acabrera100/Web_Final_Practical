import React from "react";
import "../../CSS/SongsbyGenre.css";

const GenreSelect = ({
  genres,
  handleSelect,
  handleFormSubmit,
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
      <form onSubmit={handleFormSubmit}>
        <select
          className="select"
          name="selectedGenre"
          onChange={handleSelect}
          value={selectedGenre}
        >
          <option key="0" name="selectedGenre" value="">
            {" "}
          </option>
          {genreList}
        </select>
        <button type="submit" className="submit-button">
          Sort byGenre
        </button>
      </form>
    </div>
  );
};

export default GenreSelect;
