import {
    Create_Post
} from '../_actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case Create_Post:
            // console.log('action.payload',action.payload)
            return {...state, createPost : action.payload}
        default:
            return state;
    }
}