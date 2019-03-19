import React from 'react';
import { Button,Input,Icon,Radio,Card } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../redux/user.redux';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import getWeb3 from '../utils/getWeb3';
import getContractInstance from '../utils/getContractInstance';
import '../static/user.css';


const RadioGroup = Radio.Group;

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
      <Card
      style={{
        'width':'300',
        'position': 'absolute',
        'left': '50%',
        'top':'50%',
        'transform': 'translate(-50%,-50%)'
      }}
      title="注册">
    <p style={{color:'#FF0000'}}>{this.props.msg}</p>
     <Input
     size='small'
     placeholder='请输入你的用户名'
     prefix={<Icon type="user" style={{ color:'#08c' }} />}
     onChange={v=>this.handleChange('user',v.target.value)}
     >
     </Input>

     <p/>
     <Input.Password
        prefix={<Icon type="lock" style={{ color: '#08c' }} />}
        placeholder="Password"
        onChange={e=>this.handleChange("password",e.target.value)}
        />

     <p/>
     <Input.Password
        prefix={<Icon type="lock" style={{ color: '#08c' }} />}
         placeholder="Password"
         onChange={e=>this.handleChange("repassword",e.target.value)}
         />
     <p/>
     <RadioGroup  onChange={e=>this.handleChange('type',e.target.value)}>
         <Radio  value={"buyer"}>拍卖者</Radio>
         <Radio  value={"provider"}>供应商</Radio>
     </RadioGroup>
     <p/>
     <Button type="primary" style={{'marginRight':'20px'}} onClick={this.handleRegister.bind(this)}>注册</Button>
     <a href="/login">已注册？点击这里登录</a>
     </Card>
     </div>
    )
  }
}

Register = connect(state=>state.user,{register})(Register)
export default Register
