let mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
  email: {
    type: String,

  },
  github_id: {
    type: String,
    required: true


  },
  username: {
    type: String,

  },
  name: {
    type: String
  },
  img: {
    type: String
  },
  token: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
  ,
  likes: [{product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}, value: Boolean}] 
    

}, {timestamps: true})

mongoose.model("User", UserSchema)