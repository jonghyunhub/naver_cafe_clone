import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {CommentItem} from 'components'

function ReplyComment(props) {

    
  return (
    <div className="recomment-area" style={{ marginLeft: "40px" }}>
      {props.commentList && props.commentList.map((comment,index)=>{
          return (
            comment.responseTo === props.parentCommentId && (
              <>
                <CommentItem
                  commentList={props.commentList}
                  comment={comment}
                  index={index}
                  setComment={props.setCommentList}
                />
                <ReplyComment
                  commentList={props.commentList}
                  parentCommentId={comment._id}
                  setCommentList={props.setCommentList}
                />
              </>
            )
          );
      })}
    </div>
  );
}

export default ReplyComment;
