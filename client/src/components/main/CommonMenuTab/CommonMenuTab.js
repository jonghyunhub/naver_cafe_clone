import React,{useState, useEffect} from 'react';
import './CommonMenuTab.css';
import { CafeList } from 'components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CommonMenuTab = (props)=>{

    const user =  useSelector(state => state.user);

    const [OnUi,OnUiFunc] = useState(0);
    const [cafeList, setcafeList] = useState([]);
    const [mycafeList, setmycafeList] = useState([]);

    useEffect(() => {
            
            
            axios.get('/api/cafe/getCafelist')
                    .then(response => {
                        if(response.data.success){
    
                            // console.log('cafelist', response.data.cafelist);
                            
                            setcafeList(response.data.cafelist)
    
                            // console.log('전체카페리스트',cafeList);
                        }else{
                            alert('전체 카페리스트를 가져오는데 실패했습니다.')
                        }
            })

            
        
    }, [])


    useEffect(() => {

        if(user.userData && user.userData.isAuth === true ){

            axios.post('/api/user/findmyCafe',{_id : user.userData._id})
                .then(response => {
                    if(response.data.success){
                        // console.log('mycafelist',response.data.cafelist);
                        setmycafeList(response.data.cafelist)
                    }else{
                        alert('내 카페 리스트를 가져오는데 실패했습니다.')
                    }
                })
        }
        
    }, [user])



    return(
        <div className="home_user">
            <div className="common_menu_tab">
                <ul className="tab_list">
                    <li onClick={()=>{ OnUiFunc(0) }} className={
                            OnUi === 0
                            ? "on"
                            : null}>
                    <a href="#" className="link">전체 카페</a>
                    </li>
                </ul>
                <ul className="tab_list">
                    <li onClick={()=>{ OnUiFunc(1) }} className={
                            OnUi === 1
                            ? "on"
                            : null}>
                    <a href="#" className="link">새글피드</a>
                    </li>
                </ul>
                {
                        user.userData && user.userData.isAuth === true ?
                            <ul className="tab_list">
                                <li onClick={()=>{ OnUiFunc(3) }} className={
                                        OnUi === 3
                                        ? "on"
                                        : null}>
                                    <a href="#" className="link">내 카페</a>
                                </li>
                            </ul>
                        : null 
                    }
            </div>
                <div className="user_mycafe_list">
                {
                    OnUi === 0
                    ? cafeList.map((cafe,index)=>{
                        return(
                            <CafeList data ={cafe}/>
                        )
                    })
                    : null
                }
                </div>
            {
                user.userData && user.userData.isAuth === true ?
                    <div className="user_mycafe_list">
                    {
                        OnUi === 3
                        ? mycafeList.map((cafe,index)=>{
                            return(
                                <CafeList data ={cafe}/>
                            )
                        })
                        : null
                    }
                    </div>
                :null

            }
                
            
        </div>
    )
}

export default CommonMenuTab;