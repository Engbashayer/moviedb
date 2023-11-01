const actor = require("../../models/Actor");
const Actor = require("../../models/Actor");
const movie = require("../../models/movie");

exports.fetchActor = async (actorId, next) => {
  try {
    const actor = await Actor.findById(actorId);
    return actor;
  } catch (error) {
    next(error);
  }
};

exports.getAllActors = async (req, res, next) => {
  try {
    const actors = await Actor.find().populate("movies");
    res.status(200).json(actors);
  } catch (error) {
    next(error);
  }
};

exports.creatActor = async (req, res, next) => {
  try {
    const newActor = await Actor.create(req.body);
    res.status(201).json(newActor);
  } catch (error) {
    next(error);
  }
};

exports.deleteActor = async (req, res, next) => {
  try {
    await Actor.findByIdAndRemove({ _id: req.actor._id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateActor = async (req, res, next) => {
  try {
    await Actor.findByIdAndUpdate(req.actor.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.addmoviestoactors = async (req, res, next) => {
  try {
    await req.actor.updateOne({ $push: { movies: req.movie } });
    await req.movie.updateOne({ $push: { actors: req.actor } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
