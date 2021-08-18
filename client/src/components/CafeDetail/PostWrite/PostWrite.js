import React,{useState} from 'react';
import './PostWrite.css';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from 'react-redux';
import {CreatePost} from '_actions/post_action';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { withRouter } from 'react-router';

const PostWrite = (props)=>{
    

    const dispatch = useDispatch();
    let {CafeId} = useParams();
    const board = useSelector(state => state.board)
    const user = useSelector(state => state.user)
    // console.log(user)

    const [boardId, setboardId] = useState('')
    const [postTitle, setpostTitle] = useState('')
    const [postContents, setpostContents] = useState({})

    
    const onBoardHandler = (e)=>{
        setboardId(e.currentTarget.value);
    }

    const onPostTitleHandler= (e)=>{
        setpostTitle(e.currentTarget.value);
    }

    const onPostSubmitHandler = (e)=>{
        e.preventDefault()
        const postData = {
            Board :boardId, 
            title : postTitle, 
            content : postContents,
            userId : user.userData._id._id
        }
        console.log(postData)
        if(boardId ==='' || postTitle === '' || postContents === null){
            alert('글제목, 글내용, 게시판 설정을 다시한번 확인하세요')
        } else {
            dispatch(CreatePost(postData))
                .then((response)=>{
                    if(response.payload.success){
                        props.history.push(`/CafeDetail/${CafeId}`)
                    }else{
                        alert('Error');
                    }
                })
        }
    }


    return(
        <div className="postwrite">
            <div className="WritingHeader">
                <h2 className="title">카페 글쓰기</h2>
                <div className="tool_area">
                    <a href="" className="submit_btn" onClick={onPostSubmitHandler}>
                        <span>등록</span>
                    </a>
                </div>
            </div>
            <form>
                <select onChange={onBoardHandler}>
                    {
                        board.boardlist !== undefined && board.boardlist.boardlist !== undefined ?
                        board.boardlist.boardlist.map((board,index)=>{
                            //  console.log(board._id)
                            return <option key={index}  value={board._id}>
                                    {board.name}
                                </option>
                        })
                        : null
                    }
                </select>
            <div className="TitleArea" ><textarea placeholder="제목을 입력해 주세요" onChange={onPostTitleHandler}></textarea></div>
            <CKEditor
                editor={ClassicEditor}
                data='<p>글 내용을 입력하세요!</p>'
                onChange={(event, editor) => {
                const data = editor.getData();
                // console.log(data);
                setpostContents(data);
                }}
            />
            </form>
        </div>
    )
}

export default withRouter(PostWrite);