import React, {useState, useEffect} from 'react';
import { Route } from 'react-router';
import './RightContentBox.css';
import {CafePost , PostDetail , CafeGateBox , Join, PostWrite, CafeAdmin,PostUpdate} from 'components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { totalPost } from "_actions/board_action";

const RightContentBox = (props)=>{
  const BoardData = useSelector((state) => state.board);
  const dispatch = useDispatch();
  //게시판 처음 초기화해줄때 사용할 state
  const [boardInit, setboardInit] = useState(false);
  // console.log('BoardData', BoardData);

  //맨 처음 게시판 초기화시 전체게시판을 nowBoard 리덕스에 넣어줌
    useEffect(() => {
        if(BoardData?.boardlist?.boardlist[0] && boardInit === false){
            setboardInit(true)
        }
    }, [BoardData])
    
  useEffect(() => {
    dispatch(totalPost(BoardData?.boardlist?.boardlist[0]));
  }, [boardInit]);

  return (
    <div className="RightContentBox">
      <switch>
        <Route exact path="/CafeDetail/:CafeId">
          <CafeGateBox />
          <div className="title-box">
            <h3>
              <a href>{BoardData?.nowBoard?.board?.name}</a>
            </h3>
          </div>
          <tbody>
            {BoardData?.nowBoard?.board?.Posts?.map((post, index) => {
              return <CafePost post={post} key={index} />;
            })}
          </tbody>
        </Route>
        <div className="article-board">
          <Route path="/CafeDetail/:CafeId/PostDetail/:PostId">
            <PostDetail />
            <div className="title-box">
              <h3>
                <a href="">{}</a>
              </h3>
            </div>
            <tbody>{/* 글 리스트 뿌려줄곳 */}</tbody>
          </Route>
          <Route exact path="/CafeDetail/:CafeId/Join">
            <Join />
          </Route>
          <Route exact path="/CafeDetail/:CafeId/PostWrite">
            <PostWrite />
          </Route>
          <Route exact path="/CafeDetail/:CafeId/CafeAdmin">
            <CafeAdmin />
          </Route>
          <Route exact path="/CafeDetail/:CafeId/PostUpdate/:PostId">
            <PostUpdate />
          </Route>
        </div>
      </switch>
    </div>
  );
}

export default RightContentBox;