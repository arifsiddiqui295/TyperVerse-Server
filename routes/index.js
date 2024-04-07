const express = require("express");
const router = express.Router();
const Users = require("../models/Users.js");
router.post('/',(req,res,next)=>{
  res.json("hello")
})
router.post("/post", async (req, res, next) => {
  // res.send("hlllo")
  const { username, password, speed } = req.body;
  //   console.log(username, password, speed);
  const findUser = await Users.findOne({ username });
  //   console.log("find users ", findUser);
  if (!findUser) {
    const newUser = new Users({
      username: username,
      password: password,
      speed: speed,
    });
    await newUser.save();
    res.json({
      success: true,
      message: "User Created",
      newUser: newUser,
    });
  } else {
    const isMatch = findUser.comparepassword(req.body.password);
    if (!isMatch) {
      res.json({
        success: false,
        message:
          "Incorrect password, \n If your are a new User try Using another Username",
      });
    } else {
      res.json({
        success: true,
        message: "Correct password",
        findUser: findUser,
      });
    }
  }
});
router.post("/update", async (req, res) => {
  const { username, speed } = req.body;
  console.log(username, speed);

  try {
    // Find the user by username and update the speed
    const updatedUser = await Users.findOneAndUpdate(
      { username: username }, // Query
      { $set: { speed: speed } }, // Update
      { new: true } // Options: return the updated document
    );

    // Check if the user is found and updated
    if (updatedUser) {
      console.log("User speed updated successfully:", updatedUser);
      res
        .status(200)
        .json({ message: "User speed updated successfully", updatedUser });
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user speed:", error);
    res.status(500).json({ message: "Error updating user speed" });
  }
});
router.get("/leaderboard", async (req, res, next) => {
  try {
    const users = await Users.find();
    const arr =[] // Extract speeds from users
    users.forEach((value,index)=>{
      arr[index]=value.speed;
    })
    arr.sort((a, b) => a - b);
    arr.reverse();
    const sendUser = await Promise.all(
      arr.map(async (value, index) => {
        const findUser = await Users.findOne({ speed: value });
        return findUser;
      })
    );
    console.log(arr);
    // console.log("send User",sendUser);
  res.send(sendUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
