import axios from 'axios'

const INSERT_SUCCESS = ' INSERT_SUCCESS'
const FINDONE_SUCESS = 'FINDONE_SUCESS'

const initState = {

  supplier:'',
  buyer:'',
  cpu:0,
  gpu:0,
  memory:0,
  band:0
}

export function auction(state=initState,action){
  switch(action.type){
    case INSERT_SUCCESS:
      return {...state,...action.payload}
      case FINDONE_SUCESS:
        return {...state,...action.payload}
    default:
    return state
  }
}

function insertSuccess(data){
  return {type:INSERT_SUCCESS,payload:data}
}


export function findOneSucess(data){
  return {type:FINDONE_SUCESS,payload:data}
}

//提供指定供应商的信息
export function findOneAuction(user){
  return dispatch=>{
    axios.post('/user/findOneAuction',{user}).then(res=>{
      if(res.status==200&&res.data.code===0){
        console.log(res.data.data)
        dispatch(findOneSucess(res.data.data))
      }
    })
  }
}

//讲拍卖行为记录到拍卖历史数据库中
export function insertAction({supplier,buyer,cpu,gpu,memory,band,cost}){
  return dispatch =>{
    axios.post('/user/auction',{supplier,buyer,cpu,gpu,memory,band,cost}).then(res=>{
      if(res.status==200&&res.data.code===0){
        dispatch(insertSuccess(res.data.data))
      }
    })
  }
}
