import {
    Get_Board_list,
} from '../_actions/types';

// 게시판 생성하면 리덕스에 정보 저장 해줘야함
export default function(state = {}, action){
    switch (action.type) {
        case Get_Board_list:
            return {...state, boardlist : action.payload}
       
        default:
            return state;
    }
}