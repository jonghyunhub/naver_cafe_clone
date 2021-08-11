import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";

const CreateCafeForm = (props)=> {

    const user = useSelector(state => state.user)

    const [cafeName, setcafeName] = useState('');
    const [cafeRoute, setcafeRoute] = useState('');
    const [cafeExplain, setcafeExplain] = useState('');

    const [newCafe, setnewCafe] = useState(null);

    const cafeNameHandler = (event)=>{
        setcafeName(event.currentTarget.value)
    }

    const cafeRouteHandler = (event)=>{
        setcafeRoute(event.currentTarget.value)
    }

    const cafeExplainHandler = (event)=>{
        setcafeExplain(event.currentTarget.value)
    }

    
    const onsubmitHandler = (event)=>{
        event.preventDefault();
        
        let tmpCafe = {
            name : cafeName,
            route : cafeRoute,
            explain : cafeExplain,
            manager : user.userData._id._id
        }
        
        setnewCafe(tmpCafe);
        
    }
    
    useEffect(() => {

        axios.post('/api/cafe/createCafe', {newCafe : newCafe, user : user.userData})
            .then(response => {
                console.log(response)
                props.history.push("/");
            })
        
    }, [newCafe])


    return (
        <div style={{
            height: '100%',
            backgroundColor: '#f5f6f7',
            minHeight: '100vh',
            display : 'flex',
            justifyContent : 'center',
            paddingTop : '200px'
            }}>
            <form style = {{ position : 'absolute', display : 'inline-block' ,height : '400px', margin : '0 auto'}} onSubmit={onsubmitHandler}>
                <fieldset className="login-form" style={{position : 'relative', display : 'inline-block'}}>
                    <div className="id_area">
                        <input type="text"  placeholder="카페이름" className="input-box" value={cafeName} onChange={cafeNameHandler}/>
                    </div>
                    <div style={{display : 'inline-block' , fontWeight : 'bold', fontSize : '15px'}}>/CafeDetail/</div>
                    <div className="id_area" style={{ width : '250px', position : 'relative', left : '10px', display : 'inline-block'}}>
                        <input type="text" placeholder="카페주소" className="input-box" value={cafeRoute} onChange={cafeRouteHandler}/>
                    </div>
                    <div className="id_area">
                        <input type="text" placeholder="카페 설명" className="input-box" value={cafeExplain} onChange={cafeExplainHandler}/>
                    </div>
                    <input type="submit" value="카페 만들기" id="login_sumbit_btn" />
                </fieldset>
            </form>
        </div>
    )
}

export default withRouter(CreateCafeForm);
