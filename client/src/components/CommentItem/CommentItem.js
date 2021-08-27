import React ,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import './CommentItem.css';
import { useParams } from 'react-router';
import axios from 'axios';

const CommentItem = (props)=>{

    const user = useSelector(state => state.user)
    const PostId = useParams();
    const cafe = useSelector((state) => state.cafe);
    //댓글 작성시 댓글 내용 넣고 서버에 전달할때 임시로 사용할 state
    const [commentContents, setcommentContents] = useState("");
    const [IsRecomment, setIsRecomment] = useState(false)


    //댓글 작성 폼 꺼내는 함수
    const onRecommentHandler = (e)=>{
        e.preventDefault()
        setIsRecomment(!IsRecomment);
    }



    const onContentHandler = (e) => {
      setcommentContents(e.currentTarget.value);
    };

    const onsubmitHandler = (e) => {
      e.preventDefault();
      //카페가입이 안되어있는 경우
      if (cafe.cafeInfo.isUser === false && cafe.cafeInfo.isManager === false) {
        alert("카페에 가입이 필요한 기능입니다");
      } else {
        //댓글 내용이 비어있는경우
        if (commentContents === "") {
          alert("댓글을 작성하세요");
        } else {
          var commentData = {
            writer: user.userData._id._id,
            postId: PostId.PostId,
            content: commentContents,
            responseTo: props.comment._id,
          };

          axios
            .post("/api/comment/saveComment", commentData)
            .then((response) => {
              if (response.data.success) {
                //댓글내용을 서버에 저장하고 클라에서도 새로고침없이 댓글내용을 띄워줘야 하니까 state에 넣어줌
                console.log('props.comment',props.comment)
                props.setComment(
                  props.commentList.concat(response.data.result)
                );
                //댓글창 내용 다시 비워줌
                setcommentContents("");
                //댓글작성폼 안보이게
                setIsRecomment(false);
              } else {
                alert("댓글 작성에 실패했습니다.");
              }
            });
        }
      }
    };

    return (
      <li
        className={
          props.comment?.writer?.name === user.userData?.name
            ? "comment_item mycomment"
            : "comment_item"
        }
      >
        <div className="comment_area">
          <div className="comment-writer-info">
            <a href="#" className="profile">
              <img
                src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77"
                width="36"
                height="36"
              />
            </a>
            <div className="comment-profile-area">
              <div className="comment-profile-box">
                <a href="#">{props.comment.writer.name}</a>
              </div>
              <div className="comment-text-box">{props.comment.content}</div>
              <div className="comment-bottom">
                <div className="comment-info-box">
                  {props.comment.updatedAt.substring(0, 10)}
                </div>
                <div className="more_comment">
                  <a href="#" onClick={onRecommentHandler}>
                    답글 쓰기
                  </a>
                </div>
              </div>
            </div>
          </div>
                {
                    IsRecomment &&
                        <div className="comment_write_box">
                        <div className="comment_inbox">
                            <div className="comment_inbox_name">
                            {user?.userData?._id?.name}
                            </div>
                            <textarea
                            placeholder="댓글을 남겨보세요"
                            className="comment_inbox_text"
                            value={commentContents}
                            onChange={onContentHandler}
                            ></textarea>
                        </div>
                        <div className="comment_attach">
                            <div className="register_box">
                            <a
                                href="#"
                                className="btn_register"
                                onClick={onsubmitHandler}
                            >
                                등록
                            </a>
                            </div>
                        </div>
                        </div>
                }
        </div>
      </li>
    );
}

export default CommentItem;