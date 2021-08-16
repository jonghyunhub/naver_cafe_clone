import React,{useState, useEffect} from 'react'
import './CafeAdmin.css'
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {DeleteCafe} from '_actions/cafe_action'
import {createBoard, getBoardList, DeleteBoard, UpdateBoard} from '_actions/board_action'

const CafeAdmin = (props) => {

    const cafe = useSelector(state => state.cafe)
    const board = useSelector(state => state.board)
    
    const cafeName = useParams();

    const dispatch = useDispatch();

    const [onUi, setonUi] = useState(1);
    const [boardUi, setboardUi] = useState(0);
    const [BoardName, setBoardName] = useState('');
    const [BoardExplain, setBoardExplain] = useState('');
    const [nowBoard, setnowBoard] = useState({});

    // console.log(nowBoard);

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
                        <a onClick={()=>{ setboardUi(-1) }}>
                            <span>게시판 만들기 / 카페삭제</span>
                        </a>
                    </li>
                    {
                        board.boardlist !== undefined ?
                        board.boardlist.boardlist.map((board,index)=>{
                            return(
                                <BoardList board={board} name={board.name} onUi={onUi} index={index} setonUi={setonUi} setboardUi={setboardUi}
                                setnowBoard={setnowBoard}/>
                            )
                        })
                        : null
                    }
                </ul>
            </div>
            <div className="set_area">
                <table>
                    <colgroup>
                        <col width="130"/>
                        <col width="*"/>
                    </colgroup>
                    {
                        boardUi === -1 ?
                        <tbody>
                            <h1 style={{ fontWeight :'bold' , color : 'black' }}>게시판 생성/카페 삭제</h1>
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
                            <div style={{display : 'flex'}}>
                                <tr>
                                    <button onClick={onSubmitHandler}>게시판 만들기</button>
                                </tr>
                                <tr>
                                    <button onClick={onDeleteHandler}>카페 삭제</button>
                                </tr>
                            </div>
                        </tbody>
                        : <BoardSettings nowBoard={nowBoard} index={boardUi} cafe={cafe}/>
                    }
                </table>
            </div>
        </div>
    )
}

const BoardList = (props)=>{

    const onBoardHandler = ()=>{
        props.setonUi(props.index);
        props.setboardUi(props.index);
        props.setnowBoard(props.board);
    }

    return(
        <li className={'boardlist' + ( props.onUi === props.index ? ' Boardon' : '') } onClick={onBoardHandler}>
            <a>
                <span>{props.name}</span>
            </a>
        </li>
    )
}

const BoardSettings = (props) => {
    // console.log('cafe',props.cafe.cafeInfo.cafeInfo._id);
    // console.log(props)
    const dispatch = useDispatch();

    const [name, setname] = useState('');
    const [explain, setexplain] = useState('');

    const onNowBoardNameHandler = (e) => {
        setname(e.currentTarget.value)
    }

    const onNowBoardExplainHandler = (e) => {
        setexplain(e.currentTarget.value)
    }
    
    const onBoardDeleteHandler = () =>{
        let dataToSubmit = {boardId : props.nowBoard._id}
        // console.log('dataToSubmit', dataToSubmit)
        dispatch(DeleteBoard(dataToSubmit))
            .then(response => {
                if(response.payload.success){
                    // console.log('게시판 삭제 성공')
                    
                    let cafeId = { cafeId : props.cafe.cafeInfo.cafeInfo._id } 

                    dispatch(getBoardList(cafeId))
                        .then(response => {
                            if(response.payload.success){

                            }else{
                                alert('Error');
                            }
                        })

                }else{
                    alert('게시판 삭제 실패')
                }
            })
    }


    const onBoardUpdateHandler = ()=>{

        let dataToSubmit = {boardId : props.nowBoard._id, boardName : name , boardExplain : explain }
        // console.log('dataToSubmit', dataToSubmit)
        dispatch(UpdateBoard(dataToSubmit))
            .then(response => {
                if(response.payload.success){
                    // console.log('게시판 삭제 성공')
                    
                    let cafeId = { cafeId : props.cafe.cafeInfo.cafeInfo._id } 

                    dispatch(getBoardList(cafeId))
                        .then(response => {
                            if(response.payload.success){

                            }else{
                                alert('Error');
                            }
                        })

                }else{
                    alert('게시판 삭제 실패')
                }
            })

    }



    useEffect(() => {
        
        setname(props.nowBoard.name)
        setexplain(props.nowBoard.explain)

    }, [props])

    return(
        <tbody>
            <h1 style={{ fontWeight :'bold' ,color : 'black'}}>게시판 수정</h1>
            <tr>
                <th>게시판 이름</th>
                <td>
                <input type="text" value={name} onChange={onNowBoardNameHandler}/>
                </td>
            </tr>
            <tr>
                <th>게시판 설명</th>
                <td>
                <input type="text" value={explain} onChange={onNowBoardExplainHandler}/>
                </td>
                </tr>
            {
            //props.index 가 0이라는것은 전체 게시판이라는 뜻이라서 지우면 안되니 삭제 버튼을 안보이게
                props.index !== 0 ?
                <div style={{display : 'flex'}}>
                    <tr>
                        <button onClick={()=>{onBoardUpdateHandler()}}>게시판 수정</button>
                    </tr>
                    <tr>
                        <button onClick={()=>{onBoardDeleteHandler()}}>게시판 삭제</button>
                    </tr>
                </div>
                : null
            }
        </tbody>
    )

}


export default withRouter(CafeAdmin)
