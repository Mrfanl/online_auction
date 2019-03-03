import React from 'react'
import { Input,Icon,Button} from 'antd'
import '../css/page.css'
import { Layout,Card} from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Header_com from '../component/header'
import Footer_com from '../component/footer'
import Content_com from '../component/content'
import {login} from '../redux/user.redux'

const { Header, Footer, Sider, Content } = Layout;


class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:'',
      password:''
    }
  }

 handleChange(d,v){
   this.setState({
     [d]:v
   })
 }
 handleLogin(){
    this.props.login(this.state)
 }


  handleRegister=(e)=>{
    this.props.history.push('/register')
  }

  render(){
    // const suffix = user?<Icon type="close-circle" onClick={this.emitEmpty}/>:null
    return (
   <div>
   {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
   <Layout className="layout">
   <Header className="header"><Header_com/></Header>
   <Layout>
     <Content style={{'background':'#364d79','textAlign':'center'}}>
     <Content_com/>
     </Content>

     <Sider style={{lineHeight: '100%',width:'100%'}}>
     <Card title="登录"
     style={{width:200,minHeight:500,'background':'	#787878 '}}
     >
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
     <br/>
     <Button  onClick={this.handleLogin.bind(this)}>登录</Button>
     <Button  onClick={this.handleRegister.bind(this)}>注册</Button>
      </Card>
      </Sider>

   </Layout>

   <Footer><Footer_com/></Footer>
 </Layout>
 </div>
    )
  }
}
Login = connect(state=>state.user,{login})(Login)
export default Login
