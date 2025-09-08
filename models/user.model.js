const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        trim: true,
        minlegnth: [6,"username must be aleast 6 charter"]
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlegnth: [6,"username must be aleast 6 charter"]
    },
    password : {
         type: String,
        required: true,
        trim: true,
        unique: true,
        minlegnth: [6,"username must be aleast 6 charter"]
    },
    createAt:{
        type : Date,
        default: Date.now,
    }

})
const UserRegister = mongoose.model("users",userschema)
module.exports = UserRegister