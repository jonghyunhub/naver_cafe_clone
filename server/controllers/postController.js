const {Post} = require('../models/Post')
const {Board} = require('../models/Board')

const createPost = (req,res)=>{

    console.log(req.body)

    const post = new Post(req.body)
    post.save((err)=>{
        if(err) return res.status(400).json({success : false, err})
        //글 작성한 게시판 찾아서 넣어주고
        Board.findOne({_id : req.body.Board})
        .exec((err, board)=>{
            if(err) return res.status(400).json({success : false, err})
            board.Posts.push(post._id)
            board.save((err)=>{
                // console.log(board);
                if(err) return res.status(400).json({success : false, err})
                //전체게시판에도 넣어줌
                Board.findOne({_id : req.body.totalBoard})
                .exec((err,totalboard)=>{
                    if(err) return res.status(400).json({success : false, err})
                    totalboard.Posts.push(post._id)
                    totalboard.save((err)=>{
                    // console.log(totalboard);
                    if(err) return res.status(400).json({success : false, err})
                    return res.status(200).json({success : true})
                    })
                })
            })
        }) 
    })
}


module.exports = {
    createPost
}