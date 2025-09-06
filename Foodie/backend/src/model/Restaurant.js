const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    rating: {
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },

    menu:[
        {
            name: { 
                type: String, 
                required: true },
            price: { 
                type: Number, 
                required: true },
            type: { 
                type: String, 
                required: true },
            description: { 
                type: String, 
                required: true },
            image: { 
                type: String, 
                required: true },
            available: 
            { type: Boolean, 
                default: true },
        }
        
    ],
     owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);