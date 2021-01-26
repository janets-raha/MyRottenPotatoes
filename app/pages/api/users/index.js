// route api/users

// POST  création new user
// GET  all users

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User'

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ sucess: true, data: users })
      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;
    case 'POST':
      try {
        const bcrypt = require('bcrypt');
        const newUser = req.body;
        const hashedPwd = await bcrypt.hash(newUser.password, 10)
        const user = await User.create({
          name: newUser.name,
          email: newUser.email,
          password: hashedPwd,
          role: newUser.role || 'user',
        });
        console.log(user)
        res.status(201).json({ sucess: true, data: user })
      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;
    default:
      res.status(500).json({ sucess: false, message: "Method not allowed" })
  }
}