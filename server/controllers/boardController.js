const { Board } = require('../models/Board');

const getBoardList = (req,res)=>{

    // console.log(req.body)
    Board.find({Cafe : req.body.cafeId})
        .exec((err,boards)=>{
            if(err) return res.status(400).json({success : false, err})
            return res.status(200).json({success: true, boardlist : boards})
        })

}

const createBoard = (req,res)=>{
    
    // console.log(req.body);
    
    const board = new Board(req.body);
    board.save((err)=>{
        if(err) return res.status(400).json({success : false, err})
        return res.status(200).json({success : true})
    })
}

const deleteBoard = (req,res) => {

    console.log(req.body)
    
    Board.findOneAndDelete({_id : req.body.boardId })
        .exec((err,board)=>{
            // console.log(board)
            if(err) return res.status(400).json({success : false, err})
            return res.status(200).json({success : true})
        })

}

const updateBoard = (req,res)=>{

    // console.log(req.body)
    
    Board.findOneAndUpdate({_id : req.body.boardId }, { $set: { name: req.body.boardName , explain : req.body.boardExplain} })
        .exec((err,board)=>{
            // console.log(board)
            if(err) return res.status(400).json({success : false, err})
            return res.status(200).json({success : true})
        })
}

const getNowBoard = (req,res)=> {

    // console.log(req.body)

    Board.findOne({_id : req.body._id})
    .populate({ 
        path : 'Posts',
        populate : { path : 'Writer', select : 'name' }
    })
    .exec((err,board)=>{
        if(err) return res.status(400).json({success : false, err})
        // console.log('nowboard',board)
        return res.status(200).json({success : true, nowBoard : board})
    })


}

module.exports = {
    getBoardList,
    createBoard,
    deleteBoard,
    updateBoard,
    getNowBoard
}