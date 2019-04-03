var express = require("express");
var router = express.Router();

const {
  getAllFavorites,
  getAllFavoritesSpecificSong,
  getAllFavoritesByUser,
  createFavoriteOnSong,
  deleteSingleFavorite
} = require("../db/queries/favoritesQueries.js");

router.get("/", getAllFavorites);
router.get("/byTitle/:id", getAllFavoritesSpecificSong);
router.get("/byUser/:id", getAllFavoritesByUser);
router.post("/", createFavoriteOnSong);
router.delete("/:id/:user", deleteSingleFavorite);
module.exports = router;
