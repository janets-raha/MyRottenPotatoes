// route /api/movies/:movie-id/ratings/:rating-id

// PATCH
// DELETE

import dbConnect from "../../../../../utils/dbConnect";
import Rating from "../../../../../models/Rating";

dbConnect();

export default async (req, res) => {
  const {
    query: { movieId, ratingId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const rating = await Rating.find({
          movie_id: movieId,
          _id: ratingId,
        });
        if (!rating) {
          res.status(400).json({ success: false, message: "Rating not found" });
        }
        res.status(200).json({ success: true, data: rating });
        console.log(rating);
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case "PATCH": // RECALC AVG
      try {
        const rating = await Rating.findByIdAndUpdate(ratingId, req.body, {
          new: true,
          // runValidators: true,
        });
        if (!rating) {
          res.status(400).json({ success: false, message: "Rating not found" });
        }
        res.status(200).json({ success: true, data: rating });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case "DELETE": // RECALC AVG
      try {
        const rating = await Rating.findByIdAndDelete(ratingId);
        if (!rating) {
          res.status(400).json({ success: false, message: "Rating not found" });
        }
        res.status(200).json({ success: true, data: "Rating deleted" });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(500).json({ success: false, message: "Method not allowed" });
  }
};
