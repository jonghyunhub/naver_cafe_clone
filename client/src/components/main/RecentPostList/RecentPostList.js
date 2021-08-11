import React, {useState} from 'react';
import './RecentPostList.css';

const RecentPostList = (props)=>{
    return(
        <li className="recent_list">
            <div className="recent_info">
                <span className="nickname">
                    {props.data.writer}
                </span>
                <span className="time">
                    {props.data.time}
                </span>
            </div>
            <div className="recent_title">
                <a href="#">{props.data.title}</a>
            </div>
        </li>
    )
}

export default RecentPostList;