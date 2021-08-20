import React,{useState} from 'react';
import './CafePost.css';
import { useParams } from 'react-router';


const CafePost = (props)=>{
    // console.log(props.post)
    const {CafeId} = useParams();
    const posturl = `/CafeDetail/` + `${CafeId}` + `/PostDetail/` + `${props.post._id}`;

    return(
        <tr className="cafepost">
            {
                console.log(props.post)
            }
            <td className="td_article">
                <a href={posturl}>{props.post.title}</a>
            </td>
            <td className="td_name">
                <a href="#">{props.post.Writer.name}</a>
            </td>
            <td className="td_date">{props.post.updatedAt}</td>
            <td className="td_view">{props.post.view}</td>
        </tr>
    )
}




export default CafePost;