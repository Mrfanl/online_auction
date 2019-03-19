import React from 'react';
import { Button,Card,Input,Icon} from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header_Com from '../component/header_com';
import Footer_Com from '../component/footer_com';
import { login } from '../redux/user.redux';
import '../static/layout.css';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:'',
      password:''
    }
  }

  handleChange=(d,v)=>{
    this.setState({
      [d]:v
    });
  }

  handleLogin=()=>{
    this.props.login(this.state);
  }

  render(){
    return(
      <div>
      {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
      <Header_Com/>
        <div className="login-content">
        <ul className="login-ul">
          <li
          className="login-li"

          >
          </li>
          <li className="login-li">
            <Card
            title="登录页面"
            style={{'width':'70%'}}
            >
            <p className="msg">{this.props.msg}</p>
            <p>用户名</p>
            <Input
            prefix={ <Icon type="user" style={{ color:'#08c' }} /> }
            placeholder="username"
            onChange={e=>this.handleChange("user",e.target.value)}
            />
            <p/>
            <p>密码</p>
            <Input.Password
            prefix={<Icon type="lock" style={{ color: '#08c' }} />}
            placeholder="Password"
            onChange={e=>this.handleChange("password",e.target.value)}
            />
            <p/>
            <p>
            <Button type="primary" style={{'marginLeft':'20px','marginRight':'20px','marginTop':'2em'}} onClick={()=>this.handleLogin()}>登录</Button>
            <a href="/register">未注册？点击这里注册</a></p>
            </Card>
          </li>
        </ul>
        </div>
        <Footer_Com/>
      </div>
    )
  }
}

Login = connect(state=>state.user,{ login })(Login);

export default Login;
