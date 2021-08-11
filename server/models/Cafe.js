const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafeSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
        unique : true,
        maxlength : 30,
        minlength : 2,
    },
    thumbnail : {
        type : String,
        trim : true,
    },
    explain : {
        type : String,
        trim : true,
    },
    route : {
        type : String,
        trim : true,
        required : true,
        unique : true,
        maxlength : 20,
        minlength : 4,
    },
    members : [
        {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
    ],
    manager : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
}, {timestamps : true})



const Cafe = mongoose.model('cafes', cafeSchema);

module.exports = { Cafe }