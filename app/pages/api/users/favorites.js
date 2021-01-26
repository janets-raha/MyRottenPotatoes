// route api/users

// POST  création new user
// GET  all users

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User'
import Movie from '../../../models/Movie'

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':

      try {
        const user = await User.find({ _id: req.body.id }, { favorites: 1, _id: 0 });
        const fav = user[0].favorites;
        const sugg = await Movie.find({ _id: { $in: fav } });
        res.status(200).json({ sucess: true, data: sugg })

        /*         const users = await User.find({});
                res.status(200).json({ sucess: true, data: users }) */
      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;

    default:
      res.status(500).json({ sucess: false, message: "Method not allowed" })
  }
}