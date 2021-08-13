import axios from 'axios';
import {
    Get_Cafe_info,
} from './types'

export function getCafeInfo(dataTosubmit){
    
    const request = axios.post('/api/cafe/cafeInfo',dataTosubmit)
        .then(response => response.data)

    return {
        type : Get_Cafe_info,
        payload : request
    }
}
