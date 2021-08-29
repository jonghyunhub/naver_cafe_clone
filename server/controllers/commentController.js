const {Comment} = require('../models/Comment')

const getComments = (req,res)=>{
    Comment.find({ postId  : req.body.PostId })
        .populate('writer')
        .exec((err,comments)=>{
            if(err) return res.status(400).json({success : false})
            return res.status(200).json({success : true , comments})
        })
}

const saveComment = (req,res)=>{
    // console.log(req.body)
    const comment = new Comment(req.body)
    comment.save((err,comment)=>{
        if(err) return res.status(400).json({success : false})
        //서버에 저장하고 클라 state에도 넣어줘야하므로 작성자정보를 채워서 보내줌
        Comment.find({_id : comment._id})
        .populate('writer')
        .exec((err,result)=>{
                if(err) return res.json({success : false, err})
                res.status(200).json({ success: true, result });
            })
        })
}

const deleteComment = (req,res)=>{
    // console.log(req.body)
    Comment.findOneAndDelete({ _id: req.body.commentId }).exec(
      (err,comment) => {
        if (err) return res.json({ success: false, err });
        //댓글의 대댓글도 모두 지워줌
        Comment.deleteMany({ responseTo : comment._id})
            .exec((err)=>{
                if (err) return res.json({ success: false, err });
                res.status(200).json({ success: true });
            })
      }
    );
}

//댓글 수정하는 함수
const updateComment = (req,res)=>{
    // console.log(req.body)
    Comment.findOne({_id : req.body._id})
        .exec((err,comment)=>{
            if (err) return res.json({ success: false, err });
            comment.content = req.body.content
            comment.save((err)=>{
                if (err) return res.json({ success: false, err });
                res.status(200).json({ success: true });
            })
        })
}

module.exports = {
  getComments,
  saveComment,
  deleteComment,
  updateComment,
};