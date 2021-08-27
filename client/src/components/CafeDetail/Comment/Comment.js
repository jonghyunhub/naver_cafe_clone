import React,{useEffect, useState} from 'react'
import { CommentItem , ReplyComment} from 'components';
import { useParams } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';


function Comment() {

    const PostId = useParams();
    const user = useSelector(state => state.user)
    const cafe = useSelector(state => state.cafe)
    //댓글 작성시 댓글 내용 넣고 서버에 전달할때 임시로 사용할 state 
    const [commentContents, setcommentContents] = useState('')

    //댓글 넣어줄 state
    const [Comment, setComment] = useState([])
    // console.log(PostId)

    useEffect(() => {
        
        axios.post('/api/comment/getComments', PostId)
            .then(response=>{
                if(response.data.success){
                    // console.log(response.data.comments)
                    setComment(response.data.comments)
                }else{
                    alert('댓글 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    const onContentHandler = (e)=>{
        setcommentContents(e.currentTarget.value)
    }
    
    
    const onsubmitHandler = (e)=>{
        e.preventDefault()
        //카페가입이 안되어있는 경우
        if(cafe.cafeInfo.isUser === false && cafe.cafeInfo.isManager === false){
            alert('카페에 가입이 필요한 기능입니다')
        }else{
            //댓글 내용이 비어있는경우
            if(commentContents === ''){
                alert('댓글을 작성하세요')
            }else{
    
                var commentData = {
                  writer: user.userData._id._id,
                  postId: PostId.PostId,
                  content: commentContents
                };
    
                axios.post('/api/comment/saveComment',commentData)
                    .then(response=>{
                        if(response.data.success){
                            //댓글내용을 서버에 저장하고 클라에서도 새로고침없이 댓글내용을 띄워줘야 하니까 state에 넣어줌
                            setComment(Comment.concat(response.data.result));
                            //댓글창 내용 다시 비워줌
                            setcommentContents('')
                        }else{
                            alert('댓글 작성에 실패했습니다.')
                        }
                    })
    
            }            
        }
    }


    return (
      <div className="comment_box">
        <div className="comment_option">
          <h3>댓글</h3>
        </div>
        <ul className="comment_list">
          {Comment && Comment.map((comment, index) => {
              return (
                !comment.responseTo && (
                  <>
                    <CommentItem
                      commentList = {Comment}
                      comment={comment}
                      setComment={setComment}
                      index={index}
                    />
                    <ReplyComment
                      commentList={Comment}
                      setCommentList={setComment}
                      parentCommentId={comment._id}
                    />
                  </>
                )
              );
            })}
        </ul>
        <div className="comment_write_box">
          <div className="comment_inbox">
            <div className="comment_inbox_name">{user?.userData?._id?.name}</div>
            <textarea
              placeholder="댓글을 남겨보세요"
              className="comment_inbox_text"
              value={commentContents}
              onChange={onContentHandler}
            ></textarea>
          </div>
          <div className="comment_attach">
            <div className="register_box">
              <a href="#" className="btn_register" onClick={onsubmitHandler}>
                등록
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Comment
