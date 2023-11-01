const Actor = require("../../models/Actor");
const Review = require("../../models/Review");
const movie = require("../../models/movie");

exports.fetchreview = async (reviewId, next) => {
  try {
    const review = await Review.findById(reviewId);
    return review;
  } catch (error) {
    next(error);
  }
};
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("movie");
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.creatreview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

exports.deletereview = async (req, res, next) => {
  try {
    await Review.findByIdAndRemove({ _id: req.review._id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updatereview = async (req, res, next) => {
  try {
    await Review.findByIdAndUpdate(req.review.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
