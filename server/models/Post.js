const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    title :{
        type : String,
        required : true,
        trim : true,
    },
    content : {
        type : String,
        required : true,
        trim : true,
    },
    Board : 
        {
            type : Schema.Types.ObjectId,
            ref : "board",
        },
    Writer : {
        type : Schema.Types.ObjectId,
            ref : "User",
    }
}, {timestamps : true})



const Post = mongoose.model('post', boardSchema);

module.exports = { Post }