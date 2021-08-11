import React,{useState , useEffect} from 'react';
import './MainBanner.css';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import { USER_SERVER } from '../../Config';

const MainBanner = (props)=>{
    const user = useSelector(state => state.user)

    let [btn_arrow_updown,btn_arrow_updown_func] = useState(0);
    let [btn_arrow_updown_green,btn_arrow_updown_green_func] = useState(0);
    let [search_content,search_content_func] = useState('전체');

  

    const logoutHandler = () => {
     
      axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.data.success) {
          const logoutStroage = localStorage.removeItem('userId');
          props.history.push("/login");
        } else {
          alert('Log Out Failed')
        }
      });
    };



    return(
      <div className="sub_area">
        <div className="sub_inner">
          <h1>
            <a href="#" className="logo_naver">
              <span>NAVER</span>
            </a>
            <a href="/" className="logo_cafe">
              <span>카페</span>
            </a>
          </h1>
          <form>
            <fieldset>
              <legend>검색</legend>
              <div className="search_box">
                  <div className="search_menu">
                      <a href="#" className="main_a"  onClick={()=>{
                              if(btn_arrow_updown === 0) btn_arrow_updown_func(1);
                              else btn_arrow_updown_func(0);
                          }}>
                        {search_content}
                        {
                          btn_arrow_updown === 0
                          ? <span className="ic_down"></span>
                          : <span className="ic_up"></span>
                        } 
                        <span className="ic_and"></span>
                      </a>
                      {
                        btn_arrow_updown === 1
                        ? <ul className="search_option_layer">
                            <li onClick={()=>{
                              search_content_func('전체');
                            }}>
                              <a>전체</a>
                            </li>
                            <li onClick={()=>{
                              search_content_func('카페');
                            }}>
                              <a>카페</a>
                            </li>
                            <li onClick={()=>{
                              search_content_func('전체글');
                            }}>
                              <a>전체글</a>
                            </li>
                            <li onClick={()=>{
                              search_content_func('중고거래');
                            }}>
                              <a>중고거래</a>
                            </li> 
                        </ul>
                        : null
                      }
                  </div>
                <input type="text"></input>
                <a className="btn_arrow" onClick={()=>{
                              if(btn_arrow_updown_green === 0) btn_arrow_updown_green_func(1);
                              else btn_arrow_updown_green_func(0);
                          }}>
                  {
                    btn_arrow_updown_green === 0
                    ? <span className="ic_down_green"></span>
                    : <span className="ic_up_green"></span>
                  }
                </a>
                {
                  btn_arrow_updown_green === 1 
                  ? <div className="autocomplete">
                    <div className="autocomplete_area">
                      <div className="words">
                        <p>현재 자동완성 기능을 사용하고 계십니다.</p>
                      </div>
                      <div className="func">
                        <span>
                          <a href="#">도움말</a>
                          <a href="#">기능끄기</a>
                        </span>
                      </div>
                    </div>
                  </div>
                  : null
                }
              </div>
              <button type="submit" id="btn_search">
                <span className="ico_search"></span>
              </button>
            </fieldset>
          </form>
          {
            user.userData && !user.userData.isAuth ?
              <a href="/login" className="btn_login">
                <span className="gnb_bg"></span>
                <span className="gnb_bdr"></span>
                <span className="gnb_text">로그인</span>
              </a>
              : <div className="userMenu" >
                    <h2 className="userName">
                      {user.userData && (
                        <div>
                          {user.userData.name}님 반갑습니다
                          <button className="btn_logout" onClick={logoutHandler}>logout</button>
                          <a href="/CreateCafe">
                            <button className="btn_logout">카페 만들기</button>
                          </a>
                        </div>
                      )}
                    </h2>
                </div>
          }
          <div className="cafe_gnb_wrap">

          </div>
        </div>
      </div>
    )
  }

  export default withRouter(MainBanner);