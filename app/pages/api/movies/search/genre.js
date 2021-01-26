
import dbConnect from "../../../../utils/dbConnect";
import Movie from "../../../../models/Movie";

dbConnect();

export default async (req, res) => {
  const {
    query: { query },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        let queryObj = {};
        if (query) {
          queryObj = { genres: new RegExp(query, "i") }
        }
        const movies = await Movie.find(queryObj).sort({ "_id": "desc" })
        res.status(200).json({ success: true, data: movies });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
