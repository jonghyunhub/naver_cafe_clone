import { combineReducers } from "redux";
import user from './user_reducer';
import board from './board_reducer';
import cafe from './cafe_reducer'

const rootReducer = combineReducers({
    user,
    board,
    cafe
})


export default rootReducer;