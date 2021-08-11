import React from 'react';
import {Header, RegisterForm ,Footer} from 'components';
import './Login.css';

const Register = (props)=>{
    return(
        <div className="login">
            <Header/>
            <RegisterForm/>
            <Footer/>
        </div>
    )
}

export default Register;