// route /api/users/:id

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':

      try {
        const user = await User.find({ _id: id });
        if (!user) {
          res.status(400).json({ sucess: false, message: 'User not found' })
        }
        res.status(200).json({ sucess: true, data: user })

      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;

    case 'PATCH':
      try {
        if (req.body.password) {
          const bcrypt = require('bcrypt');
          req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const user = await User.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true });
        if (!user) {
          res.status(400).json({ sucess: false, message: 'User not found' })
        }
        res.status(200).json({ sucess: true, data: user })

      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;

    case 'DELETE':
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          res.status(400).json({ sucess: false, message: 'User not found' })
        }
        res.status(200).json({ sucess: true, data: 'User deleted' })

      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;

    default:
      res.status(500).json({ sucess: false, message: "Method not allowed" })

  }

}
