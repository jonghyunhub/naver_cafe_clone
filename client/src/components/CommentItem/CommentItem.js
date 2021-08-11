import React ,{useState} from 'react';
import './CommentItem.css';

const CommentItem = (props)=>{
    return(
        <li className="comment_item">
            <div className="comment_area">
                <div className="comment-writer-info">
                        <a href="#" className="profile">
                            <img src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77" width="36" height="36" />
                        </a>
                        <div className="comment-profile-area">
                            <div className="comment-profile-box">
                                <a href="#">
                                    닉네임
                                </a>
                            </div>
                            <div className="comment-text-box">
                                    댓글내용
                            </div>
                            <div className="comment-info-box">
                                2021.06.22
                            </div>
                        </div>
                    </div>
            </div>
        </li>
    )
}

export default CommentItem;