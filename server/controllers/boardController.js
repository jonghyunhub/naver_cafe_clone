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

module.exports = {
    getBoardList,
    createBoard
}