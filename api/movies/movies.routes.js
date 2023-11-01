const express = require("express");
const router = express.Router();
const {
  getAllmovies,
  creatmovie,
  deletemovie,
  updatemovie,
  fetchmovie,
  reviewCreate,
} = require("./movies.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  const movie = await fetchmovie(movieId, next);
  if (movie) {
    req.movie = movie;
    next();
  } else {
    const err = new Error("movie Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getAllmovies);
router.post("/", creatmovie);
router.post("/:movieId", reviewCreate);
router.delete("/:movieId", deletemovie);

router.put("/:movieId", updatemovie);

module.exports = router;
