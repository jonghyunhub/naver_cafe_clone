const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    },
    subscribedCafe : [
        {
            type : Schema.Types.ObjectId,
            ref : "cafes",
        },
    ],
    manageCafe : [
        {
            type : Schema.Types.ObjectId,
            ref : "cafes",
        },
    ]
})

userSchema.pre('save',function( next ){
    //user는 위의 schema 데아터
    var user = this;

    //비밀번호가 변경될때만
    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback){
    
    //가져온 plainPassword를 암호화해서 디비에 저장된 암호화된 비밀번호랑 비교한다(암호화된 비밀번호를 원상복구 불가능)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    })
}

userSchema.methods.generateToken = function(callback){

    var user = this;

    //jsonwebtoken을 이용해서 token을 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null,user);
    })
}

userSchema.statics.findByToken = function( token, callback ){
    var user = this;

    //토큰은 decode 한다.(암호화된 토큰 해석)
    jwt.verify(token, 'secretToken', function(err,decoded){
        //decoded는 user._id를 의미함
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne( {_id : decoded, token : token}, function(err, user){
            if(err) return callback(err);
            callback(null, user);
        })
    })
}



const User = mongoose.model('User',userSchema);

module.exports = { User };