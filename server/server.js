const express = require('express');
const app = express();
const post = require('./routers/postRouter');
const user = require('./routers/userRouter');
const cafe = require('./routers/cafeRouter');
const board = require('./routers/boardRouter')
const comment = require('./routers/commentRouter');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/api/post',post);
app.use('/api/user',user);
app.use('/api/cafe',cafe);
app.use('/api/board',board);
app.use('/api/comment',comment)




const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDb connected...'))
.catch(err => {
    console.log('config',config.mongoURI);
    console.log(err);
})


const port = 3002;
app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});
