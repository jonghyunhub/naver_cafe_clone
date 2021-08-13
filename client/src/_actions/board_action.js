import axios from 'axios';
import {
    Get_Board_list, nowBoard
} from './types'

export function getBoardList(dataTosubmit){

    const request = axios.post('/api/board/getBoardList',dataTosubmit)
        .then(response => response.data)

    return {
        type : Get_Board_list,
        payload : request
    }
}

export function nowboard(board){

    return {
        type : nowBoard,
        payload : board
    }
}

