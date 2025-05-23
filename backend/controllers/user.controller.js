const User = require("../models/user.model.js");

const getSidebarUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in user controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getSidebarUsers;
