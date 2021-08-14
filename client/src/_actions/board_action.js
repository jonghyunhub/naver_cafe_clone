import axios from 'axios';
import {
    Get_Board_list, nowBoard, CreateBoard
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

export function createBoard(boardData){

    const request = axios.post('/api/board/createBoard',boardData)
        .then(response => response.data)

    return {
        type :  CreateBoard,
        payload : request
    }

}

