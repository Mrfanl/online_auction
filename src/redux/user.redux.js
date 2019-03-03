import axios from 'axios'

const REGISTER_SECCESS = 'REGISTER_SECCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initState = {
  ID:0,
  //用户名
  user:'',
  //密码
  password:'',
  //身份
  type:'',
  //头像
  avatar:'',
  //授权
  isAuth:false,
  //用于跳转
  redirectTo:'',
  //提示信息
  msg:''
}

export function user(state=initState,action){
  switch(action.type){
    case REGISTER_SECCESS:
      return {...state,...action.payload,msg:'注册成功',redirectTo:'/login'}
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
    case LOGIN_SUCCESS:
      return {...state,...action.payload,isAuth:true,msg:'登录成功',redirectTo:action.payload.type+'/auctionlist'}
    default:
    return state
  }
}


function errorMsg(data){
  return {type:ERROR_MSG,msg:data}
}

function registerSuccess(data){
  return {type:REGISTER_SECCESS,payload:data}
}

function loginSuccess(data){
  return {type:LOGIN_SUCCESS,payload:data}
}

export function register({user,password,repassword,type}){
  if(!user||!password||!type){
    return errorMsg("信息必须输入")
  }
  if(password!==repassword){
    return errorMsg("两次密码必须相同")
  }
  return dispatch=>{
    axios.post('user/register',{user,password,type}).then(res=>{
      if(res.status===200&&res.data.code===0){
        console.log(res.data.data)
        dispatch(registerSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({user,password}){
  if(!user||!password){
    return errorMsg('信息必须输入')
  }
  return dispatch=>{
    axios.post('/user/login',{user,password}).then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
