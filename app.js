const express = require("express");
const app = express();
const connectDb = require("./database");
const morgan = require("morgan");
const path = require("path");
const moviesRoutes = require("./api/movies/movies.routes");
const actorsRoutes = require("./api/actors/actors.routes");
const reviewRoutes = require("./api/reviews/reviews.routes");
connectDb();
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());

app.use("/movies", moviesRoutes);
app.use("/reviews", reviewRoutes);
app.use("/actors", actorsRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
