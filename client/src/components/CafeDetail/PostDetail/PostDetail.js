import React from 'react';
import './PostDetail.css';
import {CommentItem} from 'components';
import { useParams } from 'react-router';
import {useDispatch} from 'react-redux';

const PostDetail = (props)=>{

    const {PostId} = useParams();
    console.log('PostId',PostId)

    const dispatch = useDispatch();

    return(
        <div className="post_detail">
            <div className="article_header">
                <div className="article_title">
                    <a href="#" className="link_board">{}</a>
                </div>
                <div className="title_area">
                    {/* <h3>{props.postList[PostId].title}</h3> */}
                </div>
                <div className="writer-info">
                    <a href="#" className="profile">
                        <img src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77" width="36" height="36" />
                    </a>
                    <div className="profile-area">
                        <div className="profile-info">
                            <a href="#">
                                {/* {props.postList[PostId].writer} */}
                            </a>
                        </div>
                        <div className="article-info">
                            {/* <span className="date"> {props.postList[PostId].date} </span> */}
                            {/* <span className="count"> 조회 {props.postList[PostId].view} </span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="article_container">
                <div className="content_container">
                    {/* {props.postList[PostId].content} */}
                </div>
                <a href="#" className="writer_profile_link">
                    <div className="article_writer profile">
                    <img src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77" width="36" height="36" />
                        <span className="box">
                            {/* <strong className="user">{props.postList[PostId].writer}</strong> */}
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

export default PostDetail;