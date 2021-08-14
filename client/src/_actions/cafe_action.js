import axios from 'axios';
import {
    Get_Cafe_info,Cafe_Delete
} from './types'

export function getCafeInfo(dataTosubmit){
    
    const request = axios.post('/api/cafe/cafeInfo',dataTosubmit)
        .then(response => response.data)

    return {
        type : Get_Cafe_info,
        payload : request
    }
}

export function DeleteCafe(dataTosubmit){

    // console.log('dataToSubmin',dataTosubmit)
    const request = axios.post('/api/cafe/deleteCafe', dataTosubmit)
        .then(response => response.data)

    return {
        type : Cafe_Delete,
        payload : request
    }

}