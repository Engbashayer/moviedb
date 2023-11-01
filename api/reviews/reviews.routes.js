const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  creatreview,
  deletereview,
  updatereview,
  fetchreview,
} = require("./reviews.controllers");

router.param("reviewId", async (req, res, next, reviewId) => {
  const review = await fetchreview(reviewId, next);
  if (review) {
    req.review = review;
    next();
  } else {
    const err = new Error("review Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getAllReviews);
router.post("/", creatreview);
router.delete("/:reviewId", deletereview);

router.put("/:reviewId", updatereview);

module.exports = router;
