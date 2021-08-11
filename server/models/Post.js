const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    title :{
        type : String,
        required : true,
        trim : true,
        unique : true,
        maxlength : 30,
        minlength : 2,
    },
    route : {
        type : String,
        trim : true,
        required : true,
        unique : true,
        maxlength : 20,
        minlength : 4,
    },
    content : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        maxlength : 30,
        minlength : 2,
    },
    Board : 
        {
            type : Schema.Types.ObjectId,
            ref : "board",
        },
    Wirter : {
        type : Schema.Types.ObjectId,
            ref : "User",
    }
}, {timestamps : true})



const Post = mongoose.model('post', boardSchema);

module.exports = { Board }