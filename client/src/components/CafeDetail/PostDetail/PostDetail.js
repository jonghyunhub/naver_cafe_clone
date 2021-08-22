import React,{useEffect,useState} from 'react';
import './PostDetail.css';
import {CommentItem} from 'components';
import { useParams } from 'react-router';
import {useDispatch} from 'react-redux';
import {NowPost} from '_actions/post_action';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const PostDetail = (props)=>{

    const [isWriter, setisWriter] = useState(false);
    const {PostId} = useParams();
    // console.log('PostId',PostId)

    const post = useSelector(state => state.post)

    const dispatch = useDispatch();

    useEffect(() => {
        
        const dataToSubmit = {PostId : PostId}

        dispatch(NowPost(dataToSubmit))
            .then(response=>{
                if(response.payload.success){
                    if(response.payload.post.Writer._id === localStorage.getItem('userId') )
                        setisWriter(true)
                }else{
                    alert('Error');
                }
            })
        
    }, [])


    // const postUpdateHandler = () => {
        
    //     props.history.push('/CafeDetail/practice/PostDetail/PostUpdate')

    // }


    return(
        <div className="post_detail">
            <div className="article_header">
                <div>
                <div className="article_title">
                    <a href className="link_board">
                        {
                            post.nowPost !== undefined  ?
                            post.nowPost.post.Board.name
                            : null
                        }
                    </a>
                </div>
                <div className="title_area">
                    <h3>
                        {
                            post.nowPost !== undefined ?
                            post.nowPost.post.title
                            : null
                        }
                    </h3>
                </div>
                <div className="writer-info">
                    <a href="#" className="profile">
                        <img src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77" width="36" height="36" />
                    </a>
                    <div className="profile-area">
                        <div className="profile-info">
                            <a href="#">
                                {
                                post.nowPost !== undefined  ?
                                post.nowPost.post.Writer.name
                                : null
                                }
                            </a>
                        </div>
                        <div className="article-info">
                        {
                            post.nowPost !== undefined ?
                            <span className="date"> {post.nowPost.post.updatedAt} </span>
                            : null
                        }
                            {/* <span className="count"> 조회 {props.postList[PostId].view} </span> */}
                        </div>
                    </div>
                </div>
                </div>
                {
                    isWriter === true ?
                    <div className="post_setting_area">
                        <a href={`/CafeDetail/practice/PostUpdate/${PostId}`} role="button" className="baseBtn" onClick>수정</a>
                        <a href="#" role="button" className="baseBtn" onClick>삭제</a>
                    </div>
                    : null
                }
            </div>
            <div className="article_container">
                <div className="content_container">
                {
                                post.nowPost !== undefined  ?
                                <div dangerouslySetInnerHTML={ {__html : post.nowPost.post.content} }></div>
                                : null
                }
                </div>
                <a href="#" className="writer_profile_link">
                    <div className="article_writer profile">
                    <img src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77" width="36" height="36" />
                        <span className="box">
                        {
                                post.nowPost !== undefined  ?
                                <strong className="user">{post.nowPost.post.Writer.name}</strong>
                                : null
                        }
                            님의 게시글 더보기
                        </span>
                    </div>
                </a>
                <div className="reply_box">
                    <div className="like_article">
                        <a href="#">
                            <span className="like_icon"></span>
                        </a>
                        <a href="#" className="like_data">
                            좋아요 
                            {/* <span className="like_count">{props.postList[PostId].view}</span> */}
                        </a>
                    </div>
                </div>
            </div>
            <div className="comment_box">
                <div className="comment_option">
                    <h3>댓글</h3>
                </div>
                <ul className="comment_list">
                    <CommentItem/>
                    <CommentItem/>
                </ul>
                <div className="comment_write_box">
                    <div className="comment_inbox">
                        <div className="comment_inbox_name">
                            {/* {props.postList[PostId].nickName} */}
                        </div>
                        <textarea placeholder="댓글을 남겨보세요" rows="1" className="comment_inbox_text"></textarea>
                    </div>
                    <div className="comment_attach">
                        <div className="register_box">
                            <a href="#" className="btn_register">등록</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(PostDetail);