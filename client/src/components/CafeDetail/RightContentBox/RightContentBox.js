import React, {useState} from 'react';
import { Route } from 'react-router';
import './RightContentBox.css';
import {CafePost , PostDetail , CafeGateBox , Join, PostWrite, CafeAdmin} from 'components';

const RightContentBox = (props)=>{
    let [postList,postListFunc] = useState([
        {
            id : 0,
            title : "첫번째 글",
            writer : "종현",
            date : "2021.06.18",
            view : 0
        },
        {
            id : 1,
            title : "두번째 글",
            writer : "도현",
            date : "2021.06.19",
            view : 0
        },
        {
            id : 2,
            title : "세번째 글",
            writer : "지호",
            date : "2021.06.20",
            view : 0
        }
    ]); 
    return(
        <div className="RightContentBox">
            <switch>
                <Route exact path="/CafeDetail/:CafeId">
                    <CafeGateBox/>
                    <div className="title-box">
                        <h3>
                            <a href="#">전체글보기</a>
                        </h3>
                    </div>
                    <tbody>
                        {
                            postList.map((a,i)=>{
                                return(
                                    <CafePost data = {a}/>
                                )
                            })
                        }
                    </tbody>
                </Route>
                <div className="article-board">
                    <Route path="/CafeDetail/:CafeId/PostDetail/:PostId">
                        <PostDetail postList = {postList}/>
                        <div className="title-box">
                        <h3>
                            <a href="#">전체글보기</a>
                        </h3>
                    </div>
                    <tbody>
                        {
                            postList.map((a,i)=>{
                                return(
                                    <CafePost data = {a}/>
                                )
                            })
                        }
                    </tbody>
                    </Route>
                    <Route exact path="/CafeDetail/:CafeId/Join">
                        <Join/>
                    </Route>
                    <Route exact path="/CafeDetail/:CafeId/PostWrite">
                        <PostWrite/>
                    </Route>
                    <Route exact path="/CafeDetail/:CafeId/CafeAdmin">
                        <CafeAdmin/>
                    </Route>
                </div>
            </switch>
        </div>
    )
}

export default RightContentBox;