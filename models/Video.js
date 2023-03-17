const  mongoose = require('mongoose')

// Defining Schema
const VideoSchema = new mongoose.Schema({
  Code:{type:Number },
  Counter_Name:{type:String },
  Whatsapp_Number: {type:Number},
  Full_Address: {type:String},



 
})

// Model
const VideoModel = mongoose.model("pending", VideoSchema)

module.exports = VideoModel

// export default VideoModel
