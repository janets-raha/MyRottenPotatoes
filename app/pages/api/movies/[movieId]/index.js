// route api/movies/:movie-id

// GET all data of 1 movie
// PATCH
// DELETE

// route api/movies

// POST  création new movie
// GET  all movies

// equivalent fichier admin.js

import dbConnect from "../../../../utils/dbConnect";
import Movie from "../../../../models/Movie";
import Comment from "../../../../models/Comment";
import Rating from "../../../../models/Rating";



dbConnect();

export default async (req, res) => {
  const {
    query: { movieId },
    method
  } = req;
  switch (method) {
    case "PATCH":
      try {
        // const check = await Movie.find({ tmdb_id: req.body.tmdb_id });
        // if (check.length) throw new Error("Duplicate");
        const movie = await Movie.findByIdAndUpdate(movieId, req.body, {
          new: true,
        });
        if (!movie) {
          res.status(400).json({ success: false, message: "Rating not found" });
        }
        res.status(200).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // case "PATCH":

    //   try {

    //     const check = await Movie.find({ tmdb_id: req.body.tmdb_id });
    //     if (check.length) throw new Error("Duplicate");
    //     const movie = await Movie.create(req.body);
    //     res.status(200).json({ success: true, data: movie });

    //   } catch (error) {
    //     res.status(400).json({ success: false, error: error.message });
    //   }
    //   break;

    case "GET":
      try {
        const movie = await Movie.findById(movieId);
        res.status(200).json({ success: true, data: movie });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {

        const ratings = await Rating.deleteMany({movie_id: req.query.movieId});
        //res.status(200).json({ success: true, });

        const comments = await Comment.deleteMany({movie_id: req.query.movieId});
        //res.status(200).json({ success: true, data: comments });

        const movies = await Movie.findByIdAndDelete(req.query.movieId);
        res.status(200).json({ success: true, });

      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: error.message });
  }


};
