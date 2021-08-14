const { Board } = require('../models/Board');
const { Cafe } = require('../models/Cafe');
const { User } = require('../models/User');


const cafeList = (req, res)=>{
    Cafe.find()
    .exec((err,result)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success : true, cafelist : result })
    })
}


const cafeInfo = async (req,res)=>{
    // console.log('req.body',req.body)
    Cafe.findOne({route : req.body.CafeId })
        .populate('manager')
        .exec((err,cafeInfo)=>{
            if(err) return res.status(400).send(err);
            if(!cafeInfo) return res.status(400).json({success : false, message: '요청한 카페에 맞는 정보가 없습니다.'})
            // console.log('cafeInfo',cafeInfo)
            let isUser = false;
            let isManager = false;
            // console.log('cafeInfo.members',cafeInfo.members)
            // console.log('cafeInfo.manager',cafeInfo.manager)
            if( cafeInfo.members.includes(req.body.user) ){
                isUser = true;
            }
            if( `${cafeInfo.manager._id}` === req.body.user){
                isManager = true;
            }
           
            return res.status(200).json({ success : true, cafeInfo : cafeInfo, isUser : isUser , isManager :isManager })
        })
}


const cafeCreate = (req,res)=>{
    //클라에서 생성한 카페 정보랑 유저정보를 보내줌
    // console.log(req.body);
    
    //카페정보로는 카페를 생성하고 
    const cafe = new Cafe(req.body.newCafe);
    //카페안에 전체게시판도 생성
    const board = new Board();
    board.name = `${req.body.newCafe.name}전체게시판`;
    board.Cafe = cafe;
    board.route = `${req.body.newCafe.name}totalPost`;
    board.save((err)=>{
        if(err) return res.status(400).json({success: false, err, message : '게시판 생성에 실패했습니다.'})
        
        
        User.findOne({_id : req.body.user._id._id},(err, user)=>{
            // 보내준 유저정보로 유저를 찾고 유저정보 안에 카페매니저 리스트에 생성한 카페 추가해줌
            if(!user){
                return res.status(400).json({success : false , message : '유저를 찾을 수 없습니다.'})
            }
            cafe.manager = user;
            user.manageCafe.push(cafe);
            user.save((err)=>{
                if(err) return res.status(400).json({success : false, err});
                //생성한 카페 안에 매니저 정보로 넣어줌
                cafe.save((err) =>{
                    if(err) return res.status(400).json({success : false, err});
                    
                    return res.status(200).json({ success : true })
                })
            })
        })  

    })


}

const cafeManger = (req, res) => {

    // console.log(req.body)
    User.findOne({ _id : req.body.managerId})
        .exec((err, manager)=>{
            if(err) return res.status(400).json({success : false, err})
            return res.status(200).json({success : true, manager : manager})
        })

}


const DeleteCafe = (req, res) => {

    // console.log(req.body)
    Cafe.findOneAndDelete({ _id : req.body.cafeId})
        .exec((err)=>{
            if(err) return res.status(400).json({success : false, err})
            Board.deleteMany({Cafe : req.body.cafeId })
                .exec((err)=>{
                    if(err) return res.status(400).json({success : false, err})
                    return res.status(200).json({success : true})
                    })
        })
    
}

module.exports = {
    cafeList,
    cafeInfo,
    cafeCreate,
    cafeManger,
    DeleteCafe
};