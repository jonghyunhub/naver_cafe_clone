import axios from 'axios';
import {
    Get_Board_list
} from './types'

export function getBoardList(dataTosubmit){

    const request = axios.get('/api/board/getBoardList')
        .then(response => response.data)

    return {
        type : Get_Board_list,
        payload : request
    }
}

