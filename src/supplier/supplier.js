import React from 'react';
import { Layout,Menu,Icon,Button,Avatar,Input} from 'antd';
import { Redirect,Route} from 'react-router-dom';
import browserCookie from 'browser-cookies';

import  Auctionlist  from './auctionlist';
import Historyaction from './historyaction';
import Personcenter from './personcenter';
import getCookie from '../utils/getCookie';

const { Header,Content,Footer,Sider } = Layout
const SubMenu = Menu.SubMenu
const Search = Input.Search

const pathlist = ['/auctionlist','/historyaction','/personcenter']

class Supplier extends React.Component{
  constructor(props){
    super(props);
  this.state={
    user:'',
    linkroute:'',
  }
  this.handleClick.bind(this);
    }

    componentWillMount(){
      this.setState({
        user:getCookie('user')
      })
    }

    handleClick(e){
      this.setState({
        linkroute:'/provider'+pathlist[e.key-1]
      })
    }

  handleLogout(){
    browserCookie.erase('user')//清除cookie
    window.location.href = window.location.href

  }

  render(){

    return (
      <div>

     {this.state.linkroute?<Redirect to={this.state.linkroute}/>:null}
      <Layout style={{'minHeight':'100vh'}}>
          <Sider collapsible >
          <div style={{ 'height':'32px','background': 'rgba(255,255,255,.2)','margin': '16px'}}/>
          <Menu  onClick={this.handleClick.bind(this)} theme="dark" defaultSelectedKeys={['1']} mode="inline">
           <Menu.Item key="1">
             <Icon type="shopping-cart" />
            <span>在售商品</span>
           </Menu.Item>
           <Menu.Item key="2">
             <Icon type="form" />
             <span>拍卖历史记录</span>
           </Menu.Item>
           <Menu.Item key="3">
              <Icon type="user" />
              <span>个人中心</span>
           </Menu.Item>
          </Menu>
          </Sider>
          <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
          <div>
          <Search
           style={{width:'30%',left:'10px',floate:'left'}}
           placeholder='inpt search text'
           onSearch={value=>console.log(value)}
          />
          <div style={{float:'right',width:'20%'}}>
          <Avatar style={{backgroundColor: '#87d068'}} icon="user"/>
           <span style = {{left:'50%'}}>   {this.state.user}</span>
           <span> </span>
           <Button style={{right:'0'}} onClick={this.handleLogout.bind(this)}>退出</Button>
           </div>
           </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ margin: '16px 0' }}>
            </div>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
             <Route path={`${this.props.match.url}/auctionlist`} component={Auctionlist}/>
              <Route path={`${this.props.match.url}/historyaction`} component={Historyaction}/>
              <Route path={`${this.props.match.url}/personcenter`} component={Personcenter}/>
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            云拍卖 ©2018 一个基于区块链的组合云拍卖系统
          </Footer>
        </Layout>
      </Layout>
      </div>
    )
  }
}


export default Supplier
