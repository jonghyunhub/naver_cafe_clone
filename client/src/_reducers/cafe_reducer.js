import {
    Get_Cafe_info
} from '../_actions/types'

export default function(state = {}, action){
    switch (action.type){
        case Get_Cafe_info:
            return {...state, cafeInfo : action.payload}
        default :
            return state;
    }
}