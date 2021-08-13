import React, {useState , useEffect} from 'react';
import './CafeBanner.css';
import { useParams } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import { getCafeInfo } from '_actions/cafe_action';

const CafeBanner = (props)=>{

    const dispatch = useDispatch();

    const user = useSelector(state => state.user)

    let {CafeId} = useParams();
    let [userName,setuserName] = useState('');
    let [CafeName,setCafeName] = useState('');
    const [CafeExplain, setCafeExplain] = useState('');

    
    useEffect(() => {
    
        let dataTosubmit = { CafeId : CafeId , user : localStorage.getItem('userId')}

        dispatch(getCafeInfo(dataTosubmit))
            .then(response => {
                if(response.payload.cafeInfo){
                    // console.log(response.payload.cafeInfo)
                    setCafeName(response.payload.cafeInfo.name);
                    setCafeExplain(response.payload.cafeInfo.explain)
                }else{
                    alert('Error')
                }
            })


    }, [])


    useEffect(() => {
        
        if(user.userData && user.userData.isAuth){
            setuserName(user.userData.name)
            // console.log(user.userData)
        }

    }, [user])


    return(
        <div className="cafeBanner">
            {/* {
            console.log(props.state)
            } */}
            {/* {
            console.log(props.state[parseInt(props.CafeId.id)])
            } */}
            {/* {
                console.log(CafeId)
            } */}
            {
                user.userData && user.userData.isAuth ?
                <div className="naver_gnb">
                    <a href="#" id="link_naver">
                        <img src="https://ssl.pstatic.net/static/cafe/icon_naver_190423.png" 
                        width="52" height="10" alt="naver"  className="link_naver"/>
                    </a>
                    <div id="gnb_menu_side">
                        <div id="naver_home">
                            <a href="/">카페홈</a>
                            <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif" width="1" height="10" className="bar"/>
                        </div>
                        <div id="btn_join_cafe">
                            <a href="#">가입카페</a>
                            <a href="#">
                                <img src="https://cafe.pstatic.net/cafe4/hidden.gif" width="13" height="13" className="btn_join_down" />
                            </a>
                            <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif" width="1" height="10" className="bar"/>
                        </div>
                        <div id="btn_curnews_alarm">
                            <a href="#">새글</a>
                            <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif" width="1" height="10" className="bar"/>
                        </div>
                        <div id="btn_mynews_alarm">
                            <a href="#">내소식</a>
                            <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif" width="1" height="10" className="bar"/>
                        </div>
                        <div id="btn_mynews_alarm">
                            <a href="#">채팅</a>
                            <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif" width="1" height="10" className="bar"/>
                        </div>
                        <div id="btn_mynews_alarm">
                            <a href="#" style={ { marginLeft : '25px'} }>{userName}님 반갑습니다</a>
                            <a href="#">
                                <img src="https://cafe.pstatic.net/cafe4/hidden.gif" width="13" height="13" className="btn_join_down" />
                            </a>
                        </div>
                        <a href="#" className="gnb_service">
                            <span className="gnb_icon"></span>
                        </a>
                    </div>
                </div>
                :
                <div className="naver_gnb">
                    <a href="#" id="link_naver">
                        <img src="https://ssl.pstatic.net/static/cafe/icon_naver_190423.png" 
                        width="52" height="10" alt="naver"  className="link_naver"/>
                    </a>
                    <div id="gnb_menu_side">
                        <div id="naver_home">
                            <a href="/">카페홈</a>
                            <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif" width="1" height="10" className="bar"/>
                        </div>
                        <div id="btn_mynews_alarm">
                            <a href="/login">로그인</a>
                            <a href="#">
                                <img src="https://cafe.pstatic.net/cafe4/hidden.gif" width="13" height="13" className="btn_join_down" />
                            </a>
                        </div>
                        <a href="#" className="gnb_service">
                            <span className="gnb_icon"></span>
                        </a>
                    </div>
                </div>
            }

            <a href={`http://localhost:3000/CafeDetail/` + `${CafeId}` } className="cafe_default_banner">
                <span className="cafe_default">
                    <div className="inner_default">
                        <strong className="cafe_name">{CafeName}</strong>
                        <br />
                        <strong className="cafe_explain">{CafeExplain}</strong>
                    </div>
                </span>
            </a>
            <div id="info-search">
                <form action="">
                    <input title="카페글 검색어 입력" type="text"/>
                    <button className="btn">검색</button>
                </form>
            </div>
        </div>
    )
}


export default CafeBanner;