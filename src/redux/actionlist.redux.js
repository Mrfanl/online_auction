import axios from 'axios'

const UPDTEACTION_SUCCESS = ' UPDTEACTION_SUCCESS'
const QUERY_SUCCESS = 'QUERY_SUCCESS'


const initState = {
  //商家名称
  user:'',
  //cpu个数
  cpu:1,
  //gpu个数
  gpu:1,
  //内存容量
  memory:'8',
  //带宽
  band:'100',
  //是否销售
  isSale:true,
  //查询数据库内正在出售的供应商
  auctionlist:[]
}

export function actionlist(state=initState,action){
  switch(action.type){
    case UPDTEACTION_SUCCESS:
      return {...state,...action.payload}

    case QUERY_SUCCESS:
      return {...state,auctionlist:action.payload}


    default:
    return state
  }
}

function updateSuccess(data){
  return {type:UPDTEACTION_SUCCESS,payload:data}
}

function querySucess(data){
  return {type:QUERY_SUCCESS,payload:data}
}

//查询正在销售的供应商信息
export function queryActionlist(){
  return dispatch => {
    axios.post('/user/getActionlist').then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(querySucess(res.data.data))
      }
    })
  }
}


//供应商更新货物信息
export function updateActionlist({user,cpu,gpu,memory,band,isSale}){
  return dispatch =>{
    axios.post('/user/actionlist',{user,cpu,gpu,memory,band,isSale}).then(res=>{
      if(res.status==200&&res.data.code===0){
        dispatch(updateSuccess(res.data.data))
      }
    })
  }
}
