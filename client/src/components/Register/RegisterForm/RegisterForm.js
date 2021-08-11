import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = (props)=>{

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event)=>{
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event)=>{
        setPassword(event.currentTarget.value);
    }

    const onConfrimPasswordHandler = (event)=>{
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다!')
        }

        let body = {
            email : Email,
            name : Name,
            password : Password
        }

        dispatch(registerUser(body))
            .then(response=>{
                if(response.payload.success){
                    props.history.push("/login")
                }else{
                    alert('회원가입에 실패 했어요 ㅜㅜ')
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
                    <div className="id_area">
                        <input type="text"  placeholder="이름" className="input-box" value={Name} onChange={onNameHandler}/>
                    </div>
                    <div className="pw_area">
                        <input type="password" placeholder="비밀번호" className="input-box" value={Password} onChange={onPasswordHandler}/>
                    </div>
                    <div className="pw_area">
                        <input type="password" placeholder="비밀번호 확인" className="input-box" value={ConfirmPassword} onChange={onConfrimPasswordHandler}/>
                    </div>
                    <input type="submit" value="가입하기" id="login_sumbit_btn" />
                </fieldset>
            </form>
        </div>
    )
}

export default withRouter(RegisterForm);