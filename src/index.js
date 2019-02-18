import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import Login from './login/login';
import Register from './register/register';
import Home from './home/home';
import reducer from './reducers';
import Buyer from './buyer/buyer';
import Supplier from './supplier/supplier';
import AuthRoute from './authroute/authroute';

const store = createStore(reducer,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

// ReactDOM.render(<App />, document.getElementById('root'));

//页面路由测试
// function Home(){
//   return <h1>这是一个主页面</h1>
// }

// function Login(){
//   return <h1>这是一个用户登录界面</h1>
// }

// function Register(){
//   return <h1>这是一个用户注册页面</h1>
// }

// function Auctionlist(){
//   return <h1>这是一个拍卖品列表界面</h1>
// }


// function Supplier(){
//   return <h1>这是一个供应商提供拍卖品界面</h1>
// }

ReactDOM.render((

  <Provider store={store}>
  <BrowserRouter>
  <div>
  <AuthRoute/>
     <Switch>
     <Route path='/' exact component={App}/>
     <Route path='/login' component={Login}/>
     <Route path='/register' component={Register}/>
     <Route  path='/buyer' component={Buyer}/>
     <Route path='/provider' component={Supplier}/>
     </Switch>
    </div>
  </BrowserRouter>
  </Provider>

),document.getElementById('root')
)


serviceWorker.unregister();
