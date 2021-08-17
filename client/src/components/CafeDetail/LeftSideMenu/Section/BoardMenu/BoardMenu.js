import React ,{useEffect, useState }from 'react';
import './BoardMenu.css';
import {useDispatch} from 'react-redux';
import {getBoardList, nowboard} from '_actions/board_action'
import {useSelector} from 'react-redux';

function BoardMenu(props) {

    const cafe = useSelector(state => state.cafe)
    const board = useSelector(state => state.board)

    const dispatch = useDispatch();

    const [Board, setBoard] = useState([]);

    // console.log('cafe',cafe)
    // console.log('boardlist',board)
    

    
    useEffect(() => {

        if(cafe.cafeInfo){
            let cafeId = { cafeId : cafe.cafeInfo.cafeInfo._id } 
            
            dispatch(getBoardList(cafeId))
                .then(response=>{
                    if(response.payload.boardlist){
                        // console.log('boardlist',response.payload.boardlist)
                        
                    }else{
                        alert('Error');
                    }
                })
        }
            
    }, [cafe])

    const nowBoardHandler = (boardname)=>{
        // console.log('boardname', boardname)
        // console.log('boardname')
        dispatch(nowboard(boardname))
    }


    return (
        <div className="Board">
            <div className="board">
                게시판
            </div>
            <ul className="boardlist">
            { 
                (board !== null && board.boardlist !== undefined)&&
                board.boardlist.boardlist.map((board,index)=>{
                    return(
                        <li onClick={() =>{nowBoardHandler(board)}} >
                            <a href >
                                {board.name}
                            </a>
                        </li>
                    )
                    })
            }
            </ul>
        </div>
    )
}

export default BoardMenu
