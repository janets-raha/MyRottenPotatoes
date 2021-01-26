// route api/movies/:movie-id/comments/:comment-id

// PATCH update 1 comment
// Delete 1 comment

import dbConnect from '../../../../../utils/dbConnect';
import Comment from '../../../../../models/Comment';

dbConnect();

export default async (req, res) => {
  const {
    query: { commentId },
    method
  } = req;
  switch(method) {
    case 'GET':
      console.log(commentId)
      try {
        const comment = await Comment.findById(commentId);

        if(!comment) {
          return res.status(400).json({ succes: false });
        }

        res.status(200).json({ success: true, data: comment });
      } catch(error) {
        res.status(400).json({ success: false });
      }
      break;
    
    case 'PATCH':
      console.log(req.body)
      try {
        const comment = await Comment.findByIdAndUpdate(
          commentId,
          {comment: req.body.comment}, {
            new: true
          }
          );
        
        if(!comment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ sucess: true, data: comment });
      } catch(error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedComment = await Comment.deleteOne({ _id: commentId });
        
        if(!deletedComment) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ sucess: true, data: {} });
      } catch(error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
  }

}