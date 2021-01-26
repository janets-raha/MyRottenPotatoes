
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User'

dbConnect();

export default async (req, res) => {
  const { query: { email }, method } = req;

  switch (method) {
    case 'GET':

      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          res.status(400).json({ sucess: false, message: 'User not found' })
        }
        res.status(200).json({ sucess: true, data: user })

      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
      break;

    default:
      res.status(500).json({ sucess: false, message: "Method not allowed" })
  }
}