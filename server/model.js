const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/user'
mongoose.connect(DB_URL,{ useNewUrlParser: true })

const models={
  user:{
    'ID':{type:Number,require:true},
    'user':{type:String,require:true},
    'password':{type:String,require:true},
    'type':{type:String,require:true},
    'avatar':{type:String}
  },
  actionlist:{
    'user':{type:String,require:true},
    'cpu':{type:Number,require:true},
    'gpu':{type:Number,require:true},
    'memory':{type:Number,require:true},
    'band':{type:Number,require:true},
    'duration_time':{type:Number,require:true},
    'isSale':{type:Boolean}
  },
  auctionhistory:{
    'supplier':{type:String,require:true},
    'buyer':{type:String,require:true},
    'buytime':{type:Date,require:true},
    'cpu':{type:Number,require:true},
    'gpu':{type:Number,require:true},
    'memory':{type:Number,require:true},
    'band':{type:Number,require:true},
    'cost':{type:Number,require:true}
  }
}

for (let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
  getModel:function(name){
    return mongoose.model(name)
  }
}
