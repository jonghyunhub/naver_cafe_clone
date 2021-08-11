import React,{useState, useEffect} from 'react';
import './Join.css';
import login_btn from '/Users/chujonghyun/naver_cafe_clone/client/src/static/images/btn_chck_overlap.gif';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Join = (props)=>{

    const user = useSelector(state => state.user)
    const cafeName = useParams();
    
    // console.log('cafeName',cafeName.CafeId);

    const onSubmitHandler = (e) =>{
        e.preventDefault()

        let data = {
            userId : user.userData._id._id, 
            cafeName : cafeName
        }

        axios.post('/api/user/joinCafe',data)
            .then(response => {
                if(response.data.success){
                    // console.log(response.data)
                    props.history.push(`/CafeDetail/${cafeName.CafeId}`)
                }else{
                    alert('가입에 실패했습니다.');
                }
            })
            
    }

    // const doubleCheck = () => {

    //     axios.post('/api/')

    // }


    return(
        <div className="join">
            <form action="post" onSubmit={onSubmitHandler}>
                <div className="title_area">
                    <h3>카페 가입하기</h3>
                    <p>카페 가입을 위한 정보를 입력해주세요.</p>
                </div>
                <div className="h-35"></div>
                <h4>카페설명</h4>
                <div className="bg-color cafe-explanation">
                    어서오세요~
                </div>
                <div className="h-35"></div>
                {/* <h4>별명</h4>
                <div className="bg-color nickname_area">
                    <span>카페별 별명 설정</span>
                    <input type="text" name="nickname" }/>
                    <a href="#" className="login-btn" }>
                        <img src={login_btn} alt="" />
                    </a>
                </div> */}
                <div className="h-35"></div>
                {/* <div className="bg-color question-area">
                    <div className="question">
                        <span className="q">질문 : 연령대, 성별을 알려주세요.</span>
                        <textarea type="text" name="question" }/>
                    </div>
                </div> */}
                <button type="submit">동의 후 가입하기</button>
            </form>
        </div>
    )
}

export default withRouter(Join);