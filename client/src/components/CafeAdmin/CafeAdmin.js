import axios from 'axios';
import React,{useState} from 'react'
import './CafeAdmin.css'
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const CafeAdmin = (props) => {

    const cafeName = useParams();

    const [onUi, setonUi] = useState(1);
    const [Board, setBoard] = useState([{name : '전체게시판'},{name : '인기글'},{name : '패션게시판'}]);
    const [BoardName, setBoardName] = useState('');
    const [BoardExplain, setBoardExplain] = useState('');
    const [BoardRoute, setBoardRoute] = useState('')

    const BoardNameHander = (e)=>{
        setBoardName(e.currentTarget.value);
    }

    const BoardExpainHandler = (e)=>{
        setBoardExplain(e.currentTarget.value);
    }

    const BoardRouteHander = (e)=>{
        setBoardRoute(e.currentTarget.value);
    }


    const onSubmitHandler = ()=>{
        if(BoardName === '' || BoardExplain === ''){
            alert('게시판이름, 게시판설명을 확인해주세요!');
        } else {
            
            let boardData = {
                name : BoardName,
                explain : BoardExplain,
                route : BoardRoute,
                Cafe : localStorage.getItem('cafeId')
            }
            axios.post('/api/board/createBoard',boardData)
            .then(response => {
                if(response.data.success){
                    props.history.push(`/CafeDetail/${cafeName.CafeId}`)
                    }else{
                        alert('게시판 생성에 실패했습니다.')
                    }
                })
        }
    }

    return (
        <div className="admin_menu">
            <div className="edit_area">
                <div className="edit_title">게시판 리스트</div>
                <ul>
                    <li className="boardlist" id="createboard">
                        <a>
                            <span>게시판 만들기</span>
                        </a>
                    </li>
                    {
                        Board.map((board,index)=>{
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
                            <th>게시판 주소</th>
                            <td>
                                <input type="text" value={BoardRoute} onChange={BoardRouteHander}/>
                            </td>
                        </tr>
                        <tr>
                            <button onClick={onSubmitHandler}>저장하기</button>
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
