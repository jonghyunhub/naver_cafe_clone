import React from 'react';
import './CafeList.css';
import { RecentPostList } from 'components';

const CafeList = (props)=>{
    return(
        <div className="cafe-list">
            <div className="mycafe_info">
                <a href={"CafeDetail/" + props.data.route} className="name_area">
                    <strong>{props.data.name}</strong>
                </a>
            </div>
            <div className="mycafe_recent">
                {/* <RecentPostList data = {props.data}/>
                <RecentPostList data = {props.data}/>
                <RecentPostList data = {props.data}/> */}
                
            </div>
        </div>
    )
}

export default CafeList;