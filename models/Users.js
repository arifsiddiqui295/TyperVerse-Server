const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    speed:{
        type:Number,
        default:0
    }
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return;
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  userSchema.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
module.exports= mongoose.model('Users',userSchema);