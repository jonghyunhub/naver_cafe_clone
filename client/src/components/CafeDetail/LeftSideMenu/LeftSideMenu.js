import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import './LeftSideMenu.css';
import { BoardMenu } from 'components';
import { useSelector } from 'react-redux';

const LeftSideMenu = (props)=>{

    const cafe = useSelector(state => state.cafe)
    
    const [menuSelect,menuSelectFunc] = useState(0);

    
    const user = localStorage.userId;
    
    
    let { CafeId } = useParams();
    
    // console.log('CafeId', CafeId);
    // console.log('cafe',cafe)
    
        

    return(
        <div id="LeftSideMenu">
            <div className="cafe-info">
                <ul className="info-action-tab">
                    <li className="tit-bookmark">
                        <a href="#" className="bookmark-link">
                            <img src="https://cafe.pstatic.net/cafe4/hidden.gif" width="27" height="28" className="btn-bookmark"/>
                        </a>
                    </li>
                    <li className={"tit-info-on" + " " +  (menuSelect === 0 ? "menu-on" : "menu-off" )}
                    onClick={()=>{ if(menuSelect === 1 ) menuSelectFunc(0) }}>카페정보</li>
                    <li className={"tit-info-on" + " " +  (menuSelect === 1 ? "menu-on" : "menu-off" )}
                    onClick={()=>{ if(menuSelect === 0 ) menuSelectFunc(1) }}>나의활동</li>
                </ul>
                {
                    menuSelect === 0 && cafe.cafeInfo !== undefined
                    ? <CafeInfoDetail  cafe = {cafe} CafeId = {CafeId}/>
                    : null
                }
                <BoardMenu/>
            </div>
        </div>
    )
}

const CafeInfoDetail = (props)=>{

    // console.log('props',props)

    const [cafeTime, setcafeTime] = useState('');
    const [cafeManager, setcafeManager] = useState('');
    const [isUser, setisUser] = useState(false);
    const [isManager, setisManager] = useState(false);

    useEffect(() => {
        
        setcafeManager(props.cafe.cafeInfo.cafeInfo.manager.name)
        setisUser(props.cafe.cafeInfo.isUser)
        setisManager(props.cafe.cafeInfo.isManager)
        setcafeTime(props.cafe.cafeInfo.cafeInfo.createdAt)
        
    }, [props])

    return(
        
        <div className="cafeInfoDetail">
            <div className="info-data">
                <ul>
                    <li className="cafe-icon">
                        <a href="#">
                            <img src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_thumb_noimg_55.png" width="58" height="58" />
                        </a>
                    </li>
                    <li className="cafe-info-brief">
                        <div className="first-info-ui">
                            <div className="cafe-position">매니저</div>
                            <a href="#" className="cafe-nickname">{cafeManager}</a>
                        </div>
                        <div className="second-info-ui">
                            <a href="#" className="cafe-history">Since {cafeTime}</a>
                        </div>
                        {
                            isManager === true ?
                            <div className="third-info-ui">
                                <a href={`/CafeDetail/${props.CafeId}/CafeAdmin`} className="cafe-setting">
                                    <span className="ico_setting"></span>
                                    카페관리
                                </a>
                            </div>
                            : null
                        }
                    </li>
                </ul>
                {
                    isUser === false && isManager === false ?
                    <div className="cafe-write-btn">
                        <a href={ `/CafeDetail/${props.CafeId}/Join`}>카페 가입하기</a>
                    </div>

                    :   <div className="cafe-write-btn">
                            <a href={ `/CafeDetail/${props.CafeId}/PostWrite`}>카페 글쓰기</a>
                        </div>

                }

            </div>
        </div>
    )
}

export default LeftSideMenu;