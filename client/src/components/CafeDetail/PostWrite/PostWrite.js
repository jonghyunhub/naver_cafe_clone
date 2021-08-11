import React from 'react';
import './PostWrite.css';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostWrite = ()=>{
    return(
        <div className="postwrite">
            <form action="" >
            <CKEditor
                editor={ClassicEditor}
                data='<p>글 내용을 입력하세요!</p>'
                onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
                }}
            />
            <button>제출하기</button>
            </form>
        </div>
    )
}

export default PostWrite;