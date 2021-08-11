import pick1 from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/pick1.jpeg';
import pick2 from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/pick2.jpeg';
import pick3 from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/pick3.jpeg';
import pick4 from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/pick4.jpeg';
import pick5 from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/pick5.jpeg';
import pick6 from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/pick6.jpeg';
import React,{useState} from 'react';
import './CafeHome.css';
import { CommonMenuTab } from 'components';

const CafeHome = (props)=>{
    let Pick_data1 = [
      { title : '스팸 시리얼 스틱 레시피', img : pick1}, 
      {title : '애플 사용자들 모임', img : pick2}, 
      {title : '고소한 감자빵 만들기',img : pick3}
    ];
    let Pick_data2 = [
      {title :'휴향림 함께 즐겨요' , img : pick4}, 
      {title : '다이어트 식단 공유해요', img : pick5}, 
      {title : '미니멀 라이프 즐기기', img : pick6}
    ];
    let [PickUi,PickUiFunc] = useState(Pick_data1);
    return(
      <div>
        <div className="content">
          <div className="home_editors">
            <div className="common_title">
              <h2 className="title">Editor's Pick</h2>
            </div>
            <ul className="home_editors_pick_list">
              {
              PickUi.map((a,i)=>{
                return(<li className="pick_list"> 
                <a href="#" className="link">
                  <div className="pick_thumb">
                    <img src={a.img} alt=""  width="250" height="250"/>
                  </div>
                  <div className="pick_info">
                    <strong className="title">
                      {a.title}
                    </strong>
                  </div>
                </a>
              </li>)
                })
              } 
            </ul>
            <div className="common_btn_side">
              <a href="#" className="link_side_all">모두보기</a>
              <button type="button" title="이전" className="btn_side_prev"
              onClick={()=>{
                PickUi[0].title === Pick_data1[0].title
                ? PickUiFunc(Pick_data2) 
                : PickUiFunc(Pick_data1)
              }}></button>
              <button type="button" title="다음" className="btn_side_next"
              onClick={()=>{
                PickUi[0].title === Pick_data1[0].title
                ? PickUiFunc(Pick_data2) 
                : PickUiFunc(Pick_data1)
              }}></button>
            </div>
          </div>
          <CommonMenuTab/>
        </div>
        <div className="aside">
  
        </div>
      </div>
    )
  }

  export default CafeHome;