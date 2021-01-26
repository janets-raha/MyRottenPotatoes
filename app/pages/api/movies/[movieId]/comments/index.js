// route api/movies/:movie-id/comments

// get show all comments of 1 movie
// POST add 1 comment to a movie

import dbConnect from '../../../../../utils/dbConnect';
import Comment from '../../../../../models/Comment';

dbConnect();

export default async (req, res) => {
  const {
    query: { movieId },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const comments = await Comment.find({ movie_id: movieId, }).populate('user_id').exec();
        res.status(200).json({ success: true, data: comments })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      console.log(req.body)
      try {
        const comment = await Comment.create({
          user_id: req.body.user_id,
          movie_id: req.body.movie_id,
          comment: req.body.comment,
          timestamps: true,
        });
        //console.log(comment);
        res.status(201).json({ success: true, data: comment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}