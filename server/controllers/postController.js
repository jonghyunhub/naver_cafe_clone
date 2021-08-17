const {Post} = require('../models/Post')
const {Board} = require('../models/Board')

const createPost = (req,res)=>{

    console.log(req.body)

    const post = new Post(req.body)
    post.save((err)=>{
        if(err) return res.status(400).json({success : false, err})
        Board.findOne({_id : req.body.Board})
        .exec((err, board)=>{
            if(err) return res.status(400).json({success : false, err})
            board.Posts.push(post._id)
            board.save((err)=>{
                // console.log(board);
                if(err) return res.status(400).json({success : false, err})
                return res.status(200).json({success : true})
                })
            })
    })
}

module.exports = {
    createPost
}