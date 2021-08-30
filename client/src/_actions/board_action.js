import axios from 'axios';
import {
  Get_Board_list,
  nowBoard,
  CreateBoard,
  Board_Delete,
  Update_Board,
  Get_Total_Post,
} from "./types";

export function getBoardList(dataTosubmit){

    const request = axios.post('/api/board/getBoardList',dataTosubmit)
        .then(response => response.data)

    return {
        type : Get_Board_list,
        payload : request
    }
}

export function totalPost(board){

    console.log('board',board)

    return {
      type: Get_Total_Post,
      payload : board
    };

}

export function nowboard(board){

    const request = axios.post('/api/board/getNowBoard', board)
        .then(response => response.data)

    return {
        type : nowBoard,
        payload : request
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
