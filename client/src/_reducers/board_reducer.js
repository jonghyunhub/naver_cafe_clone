import {
    Get_Board_list,nowBoard, CreateBoard
} from '../_actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case Get_Board_list:
            // console.log('action.payload',action.payload)
            return {...state, boardlist : action.payload}
        case nowBoard:
            return {...state, nowBoard : action.payload}
        case CreateBoard:        
            console.log('action.payload',action.payload)
            return {...state, CreateBoard : action.payload}
        default:
            return state;
    }
}