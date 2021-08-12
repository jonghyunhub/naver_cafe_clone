import {
    Get_Board_list,
} from '../_actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case Get_Board_list:
            // console.log('action.payload',action.payload)
            return {...state, boardlist : action.payload}
        default:
            return state;
    }
}