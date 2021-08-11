import React,{useState} from 'react';
import './CafePost.css';
import {connect} from 'react-redux';
import { useParams } from 'react-router';


const CafePost = (props)=>{
    let {CafeId} = useParams();
    let posturl = `/CafeDetail/` + `${CafeId}` + `/PostDetail/` + `${props.data.id}`;
    return(
        <tr className="cafepost">
            {
                console.log(props.data)
            }
            <td className="td_article">
                <a href={posturl}>{props.data.title}</a>
            </td>
            <td className="td_name">
                <a href="#">{props.data.writer}</a>
            </td>
            <td className="td_date">{props.data.date}</td>
            <td className="td_view">{props.data.view}</td>
        </tr>
    )
}

function stateMakeProps(state){
    return{
        state : state
    }
}


export default connect (stateMakeProps)(CafePost);