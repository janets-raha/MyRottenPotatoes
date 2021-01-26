const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    // {
    //   createdAt: true,
    //   updatedAt: true,
    // },
  }
);

module.exports =
  mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
