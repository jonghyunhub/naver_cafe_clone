import {
    Get_Board_list,nowBoard, CreateBoard, Board_Delete , Update_Board
} from '../_actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case Get_Board_list:
            // console.log('action.payload',action.payload)
            return {...state, boardlist : action.payload}
        case nowBoard:
            return {...state, nowBoard : action.payload}
        case CreateBoard:        
            // console.log('action.payload',action.payload)
            return {...state, CreateBoard : action.payload}
        case Board_Delete:
            return {...state, DeleteBoard : action.payload}
        case Update_Board:
            return {...state, UpdateBoard : action.payload}
        default:
            return state;
    }
}