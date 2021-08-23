const {Post} = require('../models/Post')
const {Board} = require('../models/Board')

const createPost = (req,res)=>{

    // console.log(req.body)

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


const nowPost = (req,res)=>{

    // console.log(req.body);
    Post.findOne({_id  : req.body.PostId})
    .populate('Writer')
    .populate('Board')
    .exec((err,post)=>{
        if(err) return res.status(400).json({success : false, err})
        return res.status(200).json({success : true, post})
    })
}

const updatePost = (req,res) => {

    console.log(req.body);
    Post.findOne({_id : req.body.postId})
        .exec((err,post)=>{
            if(err) return res.status(400).json({success : false, err})
            // console.log('post', post)
            post.Board = req.body.afterBoard
            post.title = req.body.title
            post.content = req.body.content
            post.save((err)=>{
                 if(err) return res.status(400).json({success : false, err})
                 //원래 글 게시판 찾아서 수정하는 글 뺴내줌
                 if(req.body.previousBoard !== req.body.afterBoard){
                     Board.findOne({ _id : req.body.previousBoard })
                        .exec((err,previousboard)=>{
                            if(err) return res.status(400).json({success : false, err})
                            previousboard.Posts = previousboard.Posts.filter((element)=> element != req.body.postId)
                            previousboard.save((err)=>{
                                if(err) return res.status(400).json({success : false, err})

                                //바꿀 게시판에 현재글 넣어줌
                                Board.findOne({_id : req.body.afterBoard})
                                    .exec((err,afterboard)=>{
                                        if(err) return res.status(400).json({success : false, err})
                                        afterboard.Posts.push(req.body.postId)
                                        afterboard.save((err)=>{
                                            if(err) return res.status(400).json({success : false, err})
                                            return res.status(200).json({success : true})
                                        })
                                    })
                            })
                        })
                 }else{
                    return res.status(200).json({success : true})
                 }
            })
        })
}

const deletePost = (req,res)=>{
    // console.log(req.body)
    Post.findOneAndDelete({_id : req.body.PostId})
        .exec((err,post)=>{
            if(err) return res.status(400).json({success : false, err})
            console.log(post.Board._id)
            return res.status(200).json({success : true})
            // Board.findOne({_id : post.Board._id})
            //     .exec((err,board)=>{
            //         if(err) return res.status(400).json({success : false, err})
            //         board.Posts = board.Posts.filter((element)=> element !== post._id)
            //         board.save((err)=>{
            //             if(err) return res.status(400).json({success : false, err})
            //             return res.status(400).json({success : true})
            //         })
            //     })
        })
}

module.exports = {
    createPost, 
    nowPost,
    updatePost,
    deletePost
}