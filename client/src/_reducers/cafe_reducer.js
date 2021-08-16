import {
    Get_Cafe_info, Cafe_Delete
} from '../_actions/types'

export default function(state = {}, action){
    switch (action.type){
        case Get_Cafe_info:
            return {...state, cafeInfo : action.payload}
        case Cafe_Delete:
            // console.log('aciton.payload', action.payload)
            return {...state , cafeDeleteSuccess : action.payload.success }
        default :
            return state;
    }
}