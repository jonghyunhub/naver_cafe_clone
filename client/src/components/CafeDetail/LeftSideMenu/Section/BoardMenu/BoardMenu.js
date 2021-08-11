import axios from 'axios';
import React ,{useEffect, useState }from 'react';
import './BoardMenu.css';

function BoardMenu(props) {

    const [Board, setBoard] = useState([]);

    let cafeId = { cafeId : localStorage.getItem('cafeId') } 

    useEffect(() => {
        
        axios.post('/api/board/getBoardList', cafeId)
            .then(response =>{
                if(response.data.success){
                    // console.log('getboardlist', response.data)
                    setBoard(response.data.boardlist)
                    console.log('Board',Board);
                } else {   
                    alert('게시판 리스트를 가져오는데 실패했습니다.')
                }
            })

    }, [])

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
