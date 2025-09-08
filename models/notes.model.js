const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
    title : {
        type: String,
    },
    detail : {
        type: String
    },
    creator:{
        type : String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const createnote = mongoose.model("notes",noteSchema)
module.exports = createnote

