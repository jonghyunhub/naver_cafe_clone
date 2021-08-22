import axios from 'axios';
import {
    Create_Post, nowPost, updatePost
} from './types'

export function CreatePost(dataTosubmit){

    const request = axios.post('/api/post/createPost',dataTosubmit)
        .then(response => response.data)

    return {
        type : Create_Post,
        payload : request
    }
}

export function NowPost(dataToSubmit){

    const request = axios.post('/api/post/nowPost',dataToSubmit)
        .then(response=> response.data)

    return {
        type : nowPost,
        payload : request
    }

}

export function UpdatePost(dataToSubmit){

    const request = axios.post('/api/post/updatePost', dataToSubmit)
        .then(response=> response.data)
        
    return {
        type : updatePost,
        payload : request
    }

}
