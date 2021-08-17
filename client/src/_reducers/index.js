import { combineReducers } from "redux";
import user from './user_reducer';
import board from './board_reducer';
import cafe from './cafe_reducer';
import post from './post_reducer';

const rootReducer = combineReducers({
    user,
    board,
    cafe,
    post
})


export default rootReducer;