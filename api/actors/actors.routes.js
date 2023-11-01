const express = require("express");
const router = express.Router();
const {
  getAllActors,
  creatActor,
  deleteActor,
  updateActor,
  fetchActor,
  addmoviestoactors,
} = require("./actors.controllers");
const { fetchmovie } = require("../movies/movies.controllers");

router.param("actorId", async (req, res, next, actorId) => {
  const actor = await fetchActor(actorId, next);
  if (actor) {
    req.actor = actor;
    next();
  } else {
    const err = new Error("actor Not Found");
    err.status = 404;
    next(err);
  }
});

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

router.get("/", getAllActors);
router.post("/", creatActor);
router.delete("/:actorId", deleteActor);
router.put("/:movieId/:actorId", addmoviestoactors);
router.put("/:actorId", updateActor);

module.exports = router;
