
import dbConnect from "../../../../utils/dbConnect";
import Movie from "../../../../models/Movie";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {

  const { query: { id }, method } = req;

  switch (method) {
    case "GET":
      try {

        const user = await User.findById(id).populate('favorites').exec();
        res.status(200).json({ success: true, data: user.favorites });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
