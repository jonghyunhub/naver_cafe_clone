import React, {useState} from 'react';
import {CafeBanner, LeftSideMenu, RightContentBox ,Footer} from 'components';
import './CafeDetail.css';

const CafeDetail = (props)=>{
    return(
        <div id="cafe_body">
            <CafeBanner/>
            <div id="content-area">
                <LeftSideMenu/>
                <RightContentBox/>
            </div>
            <Footer/>
        </div>
    )
}

export default CafeDetail;