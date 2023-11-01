const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  title: String,
  comment: String,
  rate: Number,
  movie: { type: Schema.Types.ObjectId, ref: "Movie" },
});

module.exports = model("Review", ReviewSchema);
