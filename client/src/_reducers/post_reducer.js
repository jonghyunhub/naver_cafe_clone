import {
    Create_Post, nowPost, updatePost
} from '../_actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case Create_Post:
            // console.log('action.payload',action.payload)
            return {...state, createPost : action.payload}
        case nowPost:
            // console.log('action.payload',action.payload)
            return {...state, nowPost : action.payload}
        case updatePost:
            return {...state, updatePost : action.payload}
        default:
            return state;
    }
}