import React, {useState, useEffect} from 'react';
import { Route } from 'react-router';
import './RightContentBox.css';
import {CafePost , PostDetail , CafeGateBox , Join, PostWrite, CafeAdmin} from 'components';
import { useSelector } from 'react-redux';

const RightContentBox = (props)=>{

    const BoardData = useSelector(state=> state.board)

    // console.log('BoardData', BoardData);

    const [postList,setpostList] = useState([]); 

    useEffect(() => {
        
        setpostList(BoardData.nowBoard)
        console.log('postList',postList)
        
    }, [BoardData])

    return(
        <div className="RightContentBox">
            <switch>
                <Route exact path="/CafeDetail/:CafeId">
                    <CafeGateBox/>
                    <div className="title-box">
                        <h3>
                            {
                                BoardData.nowBoard ?
                                <a href>{ BoardData.nowBoard.name}</a>
                                : BoardData.boardlist ?
                                    <a href>{ BoardData.boardlist.boardlist[0].name}</a>
                                    : null
                            }
                        </h3>
                    </div>
                    <tbody>
                        {/* {
                            (postList || postList.length !== 0 )?
                            postList.map((post,index)=>{
                                return(
                                    <CafePost data = {post} key={index}/>
                                )
                            })
                            : null
                        } */}
                    </tbody>
                </Route>
                <div className="article-board">
                    <Route path="/CafeDetail/:CafeId/PostDetail/:PostId">
                        <PostDetail postList = {postList}/>
                        <div className="title-box">
                        <h3>
                            <a href="">{}</a>
                        </h3>
                    </div>
                    <tbody>
                        {/* {
                            (postList  || postList.length !== 0)?
                            postList.map((post,index)=>{
                                return(
                                    <CafePost data = {post} key={index}/>
                                )
                            })
                            : null
                        } */}
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