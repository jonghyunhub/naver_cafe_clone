import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { applyMiddleware ,createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

// let CafeData = createStore(()=>{
//   return [
//     {
//       cafeId : 0,
//       cafename :"디젤 매니아",
//       writer : "종현",
//       time : "방금 전",
//       title : "첫번째 글 제목"
//   },
//   {
//       cafeId : 1,
//       cafename :"맥쓰사",
//       writer : "도현",
//       time : "1시간 전",
//       title : "두번째 글 제목"
//   },
//   {
//       cafeId : 2,
//       cafename :"중고나라",
//       writer : "지호",
//       time : "2시간 전",
//       title : "세번째 글 제목"
//   }
//   ]
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {createStoreWithMiddleware(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
