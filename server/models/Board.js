const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
        unique : true,
        maxlength : 30,
        minlength : 2,
    },
    explain : {
        type : String,
        trim : true,
    },
    Cafe : 
        {
            type : Schema.Types.ObjectId,
            ref : "cafes",
        },
    Posts : [
        {
            type : Schema.Types.ObjectId,
            ref : "post",
        }
    ]
}, {timestamps : true})



const Board = mongoose.model('board', boardSchema);

module.exports = { Board }