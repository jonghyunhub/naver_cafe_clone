import axios from 'axios';
import React ,{useEffect, useState }from 'react';
import './BoardMenu.css';
import {useDispatch} from 'react-redux';
import {getBoardList} from '_actions/board_action'

function BoardMenu(props) {

    const dispatch = useDispatch();

    const [Board, setBoard] = useState([]);

    const cafeInfo = props.cafeInfo

    let cafeId = { cafeId : localStorage.getItem('cafeId') } 

    useEffect(() => {
        
        dispatch(getBoardList(cafeId))
            .then(response=>{
                if(response.payload.boardlist){
                    console.log('boardlist',response.payload.boardlist)
                    setBoard(response.payload.boardlist)

                }else{
                    alert('Error');
                }
            })
            
    }, [cafeInfo])

    return (
        <div className="Board">
            <div className="board">
                게시판
            </div>
            <ul className="boardlist">
            { 
                (Board !== null  )&&
                Board.map((board,index)=>{
                    return(
                        <li >
                            <a href="" >
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
