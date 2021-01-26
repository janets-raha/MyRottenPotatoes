// route /api/movies/:movie-id/ratings

// GET all ratings
// POST new rating

import dbConnect from "../../../../../utils/dbConnect";
import Rating from "../../../../../models/Rating";

dbConnect();

export default async (req, res) => {
  const {
    query: { movieId },
    method,
  } = req;

  switch (method) {
    case "POST": // RECALC AVG
      try {
        const check = await Rating.find({
          user_id: req.body.user_id,
          movie_id: req.body.movie_id,
        });
        if (check.length) {
          throw new Error("You have already rated this movie");
        }

        const rating = await Rating.create({
          user_id: req.body.user_id,
          movie_id: req.body.movie_id,
          rate: req.body.rate,
        });

        res.status(201).json({ success: true, data: rating });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "GET":
      try {
        const ratings = await Rating.find({
          movie_id: movieId,
        });
        res.status(200).json({ success: true, data: ratings });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
