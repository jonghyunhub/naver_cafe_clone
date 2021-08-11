import React, { useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){

    //매개변수 option 설명
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    //매개변수 adminRoute 는 관리자권한 관련해서 접근가능한 여부 판단 기준은 위의 option과 동일함

    function AuthenticationCheck(props){

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
        
            dispatch(auth()).then(response => {
                // console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        // 로그인 하지 않은 사람이 로그인이 필요한 페이지 접근
                        props.history.push('/login');
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //관리자만 들어갈 수 있는 페이지에 관리자가 아닌 사람이 접근
                        //관리자만 들어갈 수 있는 페이지 => adminRoute === true
                        //관리자가 아닌사람 => response.payload.isAdmin === false
                        props.history.push('/');
                    }else{
                        if(option === false){
                            //로그인한 사람이 접근이 불가능한 페이지 접근 ex) register, login
                            props.history.push('/');
                        }
                    }
                }
            })

        },[])

        return <SpecificComponent {...props} user={user} />
    }

    return AuthenticationCheck
    
}