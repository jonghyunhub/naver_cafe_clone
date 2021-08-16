import axios from 'axios';
import {
    Get_Board_list, nowBoard, CreateBoard, Board_Delete , Update_Board
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

export function DeleteBoard(boardId){

    // console.log('boardId', boardId)
    
    const request = axios.post('/api/board/deleteBoard',boardId)
        .then(response => response.data)

    return {
        type : Board_Delete,
        payload : request
    }

}


export function UpdateBoard(dataToSubmit){

    console.log('dataToSubmit', dataToSubmit)
    
    const request = axios.post('/api/board/updateBoard',dataToSubmit)
        .then(response => response.data)

    return {
        type : Update_Board,
        payload : request
    }
}
