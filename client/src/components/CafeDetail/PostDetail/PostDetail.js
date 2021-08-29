import React,{useEffect,useState} from 'react';
import './PostDetail.css';
import { useParams } from 'react-router';
import {useDispatch} from 'react-redux';
import {NowPost} from '_actions/post_action';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import {Comment} from 'components'

const PostDetail = (props)=>{

    const [isWriter, setisWriter] = useState(false);
    const {PostId} = useParams();
    const {CafeId} = useParams();
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


    const postDeleteHandler = () => {
        axios.post('/api/post/deletePost',{PostId : PostId})
            .then(response=>{
                console.log(response.data)
                if(response.data.success){
                    props.history.push(`/CafeDetail/${CafeId}`)
                }
                else alert('Error')
            })

    }


    return(
        <div className="post_detail">
            <div className="article_header">
                <div>
                <div className="article_title">
                    <a href className="link_board">
                        {
                            post?.nowPost?.post?.Board?.name
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
                            <span className="date"> {post.nowPost.post.updatedAt.substring(0, 10)} </span>
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
                        <a role="button" className="baseBtn" onClick={postDeleteHandler} style={{cursor : 'pointer'}}>삭제</a>
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
            <Comment/>
        </div>
    )
}

export default withRouter(PostDetail);