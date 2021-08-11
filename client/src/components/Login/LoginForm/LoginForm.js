import React,{useState} from 'react';
import './LoginForm.css';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

const LoginForm = (props)=>{

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event)=>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();


        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response=>{
                if(response.payload.loginSuccess){
                    // console.log(response.payload.userId);
                    localStorage.setItem('userId',response.payload.userId);
                    props.history.push('/');
                } else{
                    alert('Error');
                }
            })

    }

    return(
        <div className="container">
            <form action="#" onSubmit={onSubmitHandler}>
                <fieldset className="login-form">
                    <div className="id_area">
                        <input type="email"  placeholder="이메일" className="input-box" value={Email} onChange={onEmailHandler}/>
                    </div>
                    <div className="pw_area">
                        <input type="password" placeholder="비밀번호" className="input-box" value={Password} onChange={onPasswordHandler}/>
                    </div>
                    <input type="submit" value="로그인" id="login_sumbit_btn" />
                </fieldset>
            </form>
            <div className="find-info">
                <a href="#">
                    아이디 찾기
                    <span className="bar">|</span>
                </a>
                <a href="#">
                    비밀번호 찾기
                    <span className="bar">|</span>
                </a>
                <a href="/register">
                    회원가입
                </a>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);