const { model, Schema } = require("mongoose");

const ActorSchema = new Schema({
  name: String,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = model("Actor", ActorSchema);
