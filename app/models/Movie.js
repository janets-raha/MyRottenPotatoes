import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: false },
  release_date: { type: Date, required: true },
  poster: { type: String, required: true },
  directors: { type: String, required: false },
  actors: { type: String, required: false },
  genres: { type: String, required: false },
  avg_ratings: { type: Number, required: false, default: 0 },
  rating_count: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
