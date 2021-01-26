import dbConnect from "../../../../utils/dbConnect";
import Rating from "../../../../models/Rating";

dbConnect();

export default async (req, res) => {
  const {
    query: { movieId },
    method,
  } = req;
  // console.log(req);
  switch (method) {
    case "GET":
      try {
        const movie = await Rating.find({
          movie_id: movieId,
        });
        if (!movie) {
          res.status(400).json({ success: false, message: "Movie not found" });
        }
        res.status(200).json({ success: true, data: movie });
        // console.log("Found :", movie);

        const newAvg = await Rating.aggregate([
          // {
          //   $match: {
          //     // movie_id: ObjectId("5f6a0fb3621aa6366478adda"),
          //     movie_id: "5f6a0fb3621aa6366478adda",
          //     // movie_id: 'ObjectId("5f6a0fb3621aa6366478adda")',
          //     // movie_id: 'ObjectId("' + { movieId } + '")',
          //     // movie_id: { movieId },
          //   },
          // },
          {
            $group: {
              _id: "$movie_id",
              avgRate: { $avg: "$rate" },
            },
          },
          // {
          //   $round: ["$avgRate", 2],
          // },
        ]);
        console.log("New AVG :", newAvg);
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(500).json({ success: false, message: "Error avgRating.js" });
  }
};
