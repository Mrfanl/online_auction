const express = require('express')
const util = require('utility')

const Router = express.Router()


//获取数据表
const model = require('./model')
const User = model.getModel('user')
const Actionlist = model.getModel('actionlist')
const Auctionhistory = model.getModel('auctionhistory')

//用于密码过滤
const _filter={'password':0,'__v':0}

var UserID=2


//注册
Router.post('/register',function(req,res){
  const {user,password,type} = req.body
  User.findOne({user},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错"})
    }
    if(doc){
      console.log('用户名重复')
      return res.json({code:1,msg:"用户名重复"})
    }
    const userModel = new User({user:user,password:MD5(password),type:type,ID:UserID})
    userModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:"后端出错"})
      }else{
        UserID+=1

        return res.json({code:0,data:{user,password,type,ID:UserID-1}})
      }
    })
  })
})

//查询拍卖历史信息  0---根据拍卖者找历史数据，1---根据供应商找历史数据
Router.post('/findAuctionhistory',function(req,res){
  const {user,mark} = req.body;
  if(mark==0){
  Auctionhistory.find({buyer:user},function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错'});
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })}
  if(mark==1){
    Auctionhistory.find({supplier:user},function(err,doc){
      if(err){
        return res.json({code:1,msg:'后端出错'});
      }
      if(doc){
        return res.json({code:0,data:doc})
      }
    })
  }

})

//修改供应商的库存信息，并将拍卖记录存至拍卖历史中
Router.post('/auction',function(req,res){
  const { supplier,buyer,cpu,gpu,memory,band,cost} = req.body;
  Actionlist.findOne({user:supplier},function(e,d){
    if(e){
      return res.json({code:1,msg:"后端出错"})
    }
    if(d){
      if(cpu>d.cpu||gpu>d.gpu||memory>d.memory||band>d.band){
        return res.json({code:1,msg:"小店没货了"})
      }
      Actionlist.update({user:supplier},{$set:{user:supplier,cpu:d.cpu-cpu,gpu:d.gpu-gpu,memory:d.memory-memory,band:d.band-band}},function(err,doc){
        if(err){
          return res.json({code:1,msg:"后端出错"})
        }
        if(doc){
          console.log(doc)
          console.log("拍卖品列表更新成功")
        }
      })
    }
  })
  const actionModel = new Auctionhistory({ supplier,buyer,buytime:new Date(),cpu,gpu,memory,band,cost});
  actionModel.save(function(e,doc){
    if(e){
      return res.json({code:1,msg:'后端出错'})
    }else{
      return res.json({code:0,data:doc})
    }
  })
})

//查询正在销售的供应商信息
Router.post('/getActionlist',function(req,res){
  Actionlist.find({isSale:true},function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错'})
    }
    if(doc){
      console.log(doc)
      return res.json({code:0,data:doc})
    }
  })
})

//提供指定供应商的信息
Router.post('/findOneAuction',function(req,res){
  const { user } = req.body;
  Actionlist.findOne({user},function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})

//
Router.post('/actionlist',function(req,res){
  const {user,cpu,gpu,memory,band,isSale} = req.body
  Actionlist.findOne({user},function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错"})
    }
    if(doc){
      Actionlist.update({user:user},{$set:{user:user,cpu:cpu,user:user,cpu:cpu,gpu:gpu,memory:memory,band:band,isSale:isSale}},function(err,doc){
        if(err){
          return res.json({code:1,msg:"后端出错"})
        }
        if(doc){
          return res.json({code:0,msg:"数据更新成功"})
        }
      })
    }else{
    const actionlistModel = new Actionlist({user:user,cpu:cpu,user:user,cpu:cpu,gpu:gpu,memory:memory,band:band,isSale:isSale})
    actionlistModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:"后端出错"})
      }else{
        return res.json({code:0,data:{user:user,cpu:cpu,user:user,cpu:cpu,gpu:gpu,memory:memory,band:band,isSale:isSale}})
      }
  })
}
})})

// Router.post('/isSale',function(req,res){
//   const { user,isSale } = req.body
//   Actionlist.update({user:user},{$set:{isSale:isSale}},function(err,doc){
//     if(err){
//       return res.json({code:1,msg:"后端出错"})
//     }
//     if(doc){
//       return res.json({code:0,data:{isSale:isSale}})
//     }
//   })
// })

Router.post('/login',function(req,res){
  const {user,password} = req.body

  User.findOne({user,password:MD5(password)},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错'})
    }
    if(doc){
      res.cookie('user',doc.user)
      return res.json({code:0,data:doc})
    }else{
      return res.json({code:1,msg:'用户密码错误'})
    }
  })
})

//将密码通过MD5进行加密

function MD5(data){
  salt = 'I_LOVE_COMPUTER'
  return util.md5(util.md5(data+salt))
}

module.exports = Router
