import axios from 'axios'


const FIND_SUCESS = 'FIND_SUCESS'

const initState = {

    historylist:[]

}

export function auctionhistory(state=initState,action){
  switch(action.type){
    case FIND_SUCESS:
      return {...state,historylist:action.payload}
    default:
    return state
  }
}


export function findSucess(data){
  return {type:FIND_SUCESS,payload:data}
}

//提供拍卖的历史信息
export function findAuctionhistory(user,mark){
  return dispatch=>{
    axios.post('/user/findAuctionhistory',{user,mark}).then(res=>{
      if(res.status==200&&res.data.code===0){
        const data = res.data.data
        for(var i=0;i<data.length;i++){
          data[i]._id=i;

        }
        dispatch(findSucess(data))
      }
    })
  }
}
