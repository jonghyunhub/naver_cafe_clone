import React, {useState} from 'react';
import './MainTap.css';
import { CafeHome } from 'components';

const MainTap = (props)=>{
    let [TapOn, TapOnFunc] = useState(0);
    let [TapContent, TapContentFunc] = useState(['카페홈','주제별', '지역별', '랭킹', '대표카페', '내소식', '채팅']);
    let [NowTap,NowTapFunc] = useState('카페홈');
    return(
    <div id="gnb_menu">
      <div className="align_center" id="main_tap">
        <ul className="lnb">
          {TapContent.map((a,i)=>{
            return(
            <li className={
              TapOn === i
              ? "on"
              : null
              }>
              <a href="#" className="lnb_link" onClick={()=>{
                TapOnFunc(i);
                NowTapFunc(a);
              }}>{TapContent[i]}</a>
            </li>
            )})
          }
        </ul>
        <div id="container">
        {
          {
            카페홈 : <CafeHome/>,
            주제별 : <p>주제별</p>,
            지역별 : <p>지역별</p>,
            랭킹 : <p>랭킹</p>,
            대표카페 : <p>대표카페</p>,
            내소식 : <p>내소식</p>,
            채팅 : <p>채팅</p>,
          }[NowTap] 
        }
        </div>
      </div>
    </div>
    )
  }

  export default MainTap;