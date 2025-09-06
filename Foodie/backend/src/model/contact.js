const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{timestamps:true});

const Message = mongoose.model("Message",messageSchema);

module.exports = Message;