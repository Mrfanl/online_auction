import React from 'react'
import { Button,Input,Icon,Radio,Card } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../redux/user.redux'
import '../css/page.css'
import './register.css'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import getWeb3 from '../utils/getWeb3';
import getContractInstance from '../utils/getContractInstance';


const RadioGroup = Radio.Group

class Register extends React.Component{
  constructor(props){
   super(props)
   this.state={
     user:'',
     password:'',
     repassword:'',
     type:'',
     web3:''
   }
  }

  componentDidMount(){
    getWeb3.then(res=>{
      this.setState({
        web3:res.web3
      })
    })
 }


  handleChange(d,v){
  this.setState({
    [d]:v
  })
}

handleRegister = ()=>{
   this.instantiateContract();
    this.props.register(this.state);

}

instantiateContract(){

  this.state.web3.eth.getAccounts((error,accounts)=>{
       getContractInstance.then(instance=>{
         instance.register(this.state.user,{from:accounts[0]}).then(results=>{
         console.log('已经在链上注册完毕');
       })
     })
     })
}




  render(){
    return (
      <div>
       {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
      <Card title="注册"
      style={{width:'200px',position:'absolute',top:'20%',left:'40%'}}>
    <p style={{color:'#FF0000'}}>{this.props.msg}</p>
     <Input
     size='small'
     placeholder='请输入你的用户名'
     prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
     onChange={v=>this.handleChange('user',v.target.value)}
     >
     </Input>

     <p/>
     <Input
     size='small'
     type='password'
     placeholder='请输入你的密码'
     prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
     onChange={v=>this.handleChange('password',v.target.value)}
     ></Input>

     <p/>
     <Input
     size='small'
     type='password'
     placeholder='请确认你的密码'
     prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
     onChange={v=>this.handleChange('repassword',v.target.value)}
     ></Input>
     <p/>
     <RadioGroup  onChange={v=>this.handleChange('type',v.target.value)}>
         <Radio  value={"buyer"}>拍卖者</Radio>
         <Radio  value={"provider"}>供应商</Radio>
     </RadioGroup>
     <Button onClick={this.handleRegister.bind(this)}>注册</Button>
     </Card>
     </div>
    )
  }
}

Register = connect(state=>state.user,{register})(Register)
export default Register
