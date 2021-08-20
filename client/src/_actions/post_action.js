import axios from 'axios';
import {
    Create_Post, nowPost
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
