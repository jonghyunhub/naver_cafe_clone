import './App.css';
import './common.css';
import React from 'react';
import {Main, CafeDetail, PostDetail, Login, Register, CreateCafe} from 'pages';
import {Link,Route, Switch} from 'react-router-dom';
import Auth from './hoc/auth'


function App() {

  //null   Anyone Can go inside
  //true   only logged in user can go inside
  //false  logged in user can't go inside

  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={ Auth(Main, null)}></Route>
          <Route path="/CafeDetail/:CafeId" component={ Auth(CafeDetail, null)}></Route>
          <Route path="/CafeDetail/:CafeId/PostDetail/:PostId" component={ Auth(PostDetail,null)}></Route>
          <Route path="/login" component={ Auth(Login,false) }></Route>
          <Route path="/register" component={ Auth(Register, false) }></Route>
          <Route path="/CreateCafe" component={ Auth(CreateCafe, true) } />
        </Switch>
    </div>
  );
}

export default App;