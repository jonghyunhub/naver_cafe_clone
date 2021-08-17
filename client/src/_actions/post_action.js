import axios from 'axios';
import {
    Create_Post
} from './types'

export function CreatePost(dataTosubmit){

    const request = axios.post('/api/post/createPost',dataTosubmit)
        .then(response => response.data)

    return {
        type : Create_Post,
        payload : request
    }
}
