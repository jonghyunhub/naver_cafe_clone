const { User }  = require('../models/User');
const { Cafe } = require('../models/Cafe');

const register = (req, res) => {

    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);

    user.save((err,user)=>{
        if(err) return res.json({ success : false, err })
        return res.status(200).json({
            success : true
        })
    })
}

const login = (req, res) => {

    //요청한 이메일을 데이터베이스에서 찾는다
    User.findOne( { email : req.body.email },(err, user)=>{
        if(!user){
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
                return res.json( { loginSuccess : false, message : "비밀번호가 틀렸습니다." })
            
            //비민번호 까지 맞다면 토큰을 생성한다.
            user.generateToken((err,user)=>{
                //400은 에러가 있음을 의미
                if(err) return res.status(400).send(err);

                //토큰을 쿠키에 저장한다 => cookieParser 이용
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess : true, userId : user._id
                })
            })
        })
    })
}

const logout = (req, res) => {
    User.findOneAndUpdate({ _id : req.user._id },
        {token : ''}
        ,(err, user)=>{
            if(err) return res.json({ success : false, err});
            console.log(req.user);
            return res.status(200).send({
                success : true
            })
        })
}

const auth = (req, res) => {
    //role == 0 -> 일반유저 role != 0 -> 관리자
    res.status(200).json({
        _id : req.user,
        role : req.user.role,
        isAdmin : req.user.role === 0  ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        image : req.user.image
    })

}

//유저가 가입한 카페를 찾아줌
const findmyCafe = (req, res) =>{
    // console.log('id', req.body._id)
    User.findOne({ _id : req.body._id._id})
        .populate('subscribedCafe')
        .populate('manageCafe')
        .exec((err,user)=>{
            // console.log('user', user)
            if(err) return res.status(400).json({success : false, err})
            let cafelist = []
            cafelist.push(...user.manageCafe)
            cafelist.push(...user.subscribedCafe)
            return res.status(200).json({ success : true, cafelist : cafelist })
        })
    
}

const joinCafe = (req, res)=>{
    //클라로부터 받아온 유저정보로 찾은 유저모델에 클라로부터 받아온 카페 정보를 추가해줌
    console.log(req.body)
    
    User.findOne({_id : req.body.userId} )
        .exec((err, user)=>{
            if(!user){
                return res.status(400).json({success : false, message : '유저가 없습니다.'})
            }
            if(err) return res.status(400).json({success : false, err})

                console.log( 'cafeName' , req.body.cafeName.CafeId)
          
                Cafe.findOne({ route : req.body.cafeName.CafeId })
                    .exec((err, cafe)=>{
                        if(err) return res.status(400).json({success : false, err})
                        console.log(cafe)
                        user.subscribedCafe.push(cafe._id)
                        user.save((err)=>{
                            if(err) return res.status(400).json({success : false, err})
                        })
                        cafe.members.push(user._id)
                        cafe.save((err)=>{
                           if(err) return res.status(400).json({success : false, err})
                        })
                        return res.status(200).json({success : true})
                    })


            })
}

module.exports = {
    register,
    login,
    logout,
    auth,
    findmyCafe,
    joinCafe
};