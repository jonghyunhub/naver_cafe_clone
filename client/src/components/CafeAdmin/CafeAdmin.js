import React,{useState} from 'react'
import './CafeAdmin.css'
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {DeleteCafe} from '_actions/cafe_action'
import {createBoard, getBoardList} from '_actions/board_action'

const CafeAdmin = (props) => {

    const cafe = useSelector(state => state.cafe)
    const board = useSelector(state => state.board)

    const cafeName = useParams();

    const dispatch = useDispatch();

    const [onUi, setonUi] = useState(1);
    const [Board, setBoard] = useState([{name : '전체게시판'},{name : '인기글'},{name : '패션게시판'}]);
    const [BoardName, setBoardName] = useState('');
    const [BoardExplain, setBoardExplain] = useState('');

    const BoardNameHander = (e)=>{
        setBoardName(e.currentTarget.value);
    }

    const BoardExpainHandler = (e)=>{
        setBoardExplain(e.currentTarget.value);
    }



    const onSubmitHandler = ()=>{
        //게시판 생성할때 리덕스로 해줘야함 그래야 새로고침안해도 데이터 랜더링됨
        if(BoardName === '' || BoardExplain === ''){
            alert('게시판이름, 게시판설명을 확인해주세요!');
        } else {
            
            let boardData = {
                name : BoardName,
                explain : BoardExplain,
                Cafe : cafe.cafeInfo.cafeInfo._id
            }
            dispatch(createBoard(boardData))
                .then(response=>{
                    if(response.payload.success){
                        let cafeId = { cafeId : cafe.cafeInfo.cafeInfo._id } 
            
                        dispatch(getBoardList(cafeId))
                            .then(response=>{
                                if(response.payload.success){
                                    props.history.push(`/CafeDetail/${cafeName.CafeId}`)
                                }else{
                                    alert('Error');
                                }
                            })
                    } else{
                        alert('게시판 생성에 실패했습니다.')
                    }
                })
        }

    }

    const onDeleteHandler = () => {

        dispatch(DeleteCafe( { cafeId : cafe.cafeInfo.cafeInfo._id } ))
            .then(response=>{
                // console.log('response',response)
                if(response.payload.success){
                    props.history.push('/')
                } else {
                    alert('카페 삭제에 실패했습니다')
                }
            })

    }

    return (
        <div className="admin_menu">
            <div className="edit_area">
                <div className="edit_title">게시판 리스트</div>
                <ul>
                    <li className="boardlist" id="createboard">
                        <a>
                            <span>게시판 만들기 / 카페삭제</span>
                        </a>
                    </li>
                    {
                        board.boardlist.boardlist.map((board,index)=>{
                            return(
                                <BoardList name={board.name} onUi={onUi} index={index} setonUi={setonUi} />
                            )
                        })
                    }
                </ul>
            </div>
            <div className="set_area">
                <table>
                    <colgroup>
                        <col width="130"/>
                        <col width="*"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>게시판 이름</th>
                            <td>
                                <input type="text" value={BoardName}  onChange={BoardNameHander}/>
                            </td>
                        </tr>
                        <tr>
                            <th>게시판 설명</th>
                            <td>
                                <input type="text" value={BoardExplain} onChange={BoardExpainHandler}/>
                            </td>
                        </tr>
                        <tr>
                            <button onClick={onSubmitHandler}>게시판 만들기</button>
                        </tr>
                        <tr>
                            <button onClick={onDeleteHandler}>카페 삭제</button>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const BoardList = (props)=>{

    const onBoardHandler = ()=>{
        props.setonUi(props.index);
    }

    return(
        <li className={'boardlist' + ( props.onUi === props.index ? ' Boardon' : '') } onClick={onBoardHandler}>
            <a>
                <span>{props.name}</span>
            </a>
        </li>
    )
}

export default withRouter(CafeAdmin)
