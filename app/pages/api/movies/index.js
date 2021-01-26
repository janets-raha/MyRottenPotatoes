// route api/movies

// POST  création new movie
// GET  all movies

// equivalent fichier admin.js

import dbConnect from '../../../utils/dbConnect';
import Movie from '../../../models/Movie'

dbConnect();

export default async (req, res) => {

  const { method, query: { query }
  } = req;
  switch (method) {

    case "POST":

      try {

        const check = await Movie.find({ tmdb_id: req.body.tmdb_id });
        if (check.length) throw new Error("Duplicate");
        const movie = await Movie.create(req.body);
        res.status(200).json({ success: true, data: movie });

      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "GET":
      try {

        let queryObj = {};
        if (query) {
          queryObj = { title: new RegExp(query, "i") }
        }
        const movies = await Movie.find(queryObj).sort({ "_id": "desc" })
        res.status(200).json({ success: true, data: movies });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "def" + error.message });

  }

}