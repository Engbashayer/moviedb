const Movie = require("../../models/movie");
const Review = require("../../models/Review");

exports.fetchmovie = async (movieId, next) => {
  try {
    const movie = await Movie.findById(movieId);
    return movie;
  } catch (error) {
    next(error);
  }
};
exports.getAllmovies = async (req, res, next) => {
  try {
    const Movies = await Movie.find().populate("reviews");
    res.status(200).json(Movies);
  } catch (error) {
    next(error);
  }
};

exports.creatmovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

exports.deletemovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove({ _id: req.movie._id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updatemovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.movie.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.reviewCreate = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    await req.movie.updateOne({ $push: { reviews: newReview } });
    res.status(201).json(req.movie);
  } catch (error) {
    next(error);
  }
};
