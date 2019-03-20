import React from 'react'
import { Avatar,Card,Tag,Tabs,Divider,Table,Input,Button,Icon} from 'antd';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import getCookie from '../utils/getCookie';
import getWeb3 from '../utils/getWeb3';
import getContractInstance from '../utils/getContractInstance';
import '../static/user.css';

const { Meta } = Card;
const TabPane = Tabs.TabPane;
class Personcenter extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:'',
      balance:0,
      web3:''
    }
  }
 componentWillMount(){
   getWeb3.then(res=>{
    this.setState({
      user:getCookie('user'),
      web3:res.web3
    });
    this.instantiateContract();
  });

}
instantiateContract(){
getWeb3.then(res=>{
  res.web3.eth.getAccounts((error,accounts)=>{
       getContractInstance().then(instance=>{
         instance.getBalance(this.state.user,{from:accounts[0]}).then(results=>{
         this.setState({
           balance:results.c[0]
         });
       });
     });
   });
 });
}
  render(){
    return (
      <div>
      <Card
      >
      <Meta
       avatar={<Avatar size={64} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon="user"/>}
       title={this.state.user}
       description="This is the description"
      />
      <p/>
      <Tag color="green">余  额：</Tag>
      {this.state.balance}
      <Divider />
      <Tabs defaultActiveKey="1" >
      <TabPane tab="个人信息" key="1">
      <table>
      <tr style={{'height':'3em'}}>
      <td><Tag color="purple">姓名</Tag>：{this.state.user}</td>
      <td ><Tag color="purple">性别</Tag>：未填写</td>
      </tr>

      <tr style={{'height':'3em'}}>
      <td><Tag color="purple">邮箱</Tag>：未填写</td>
      <td><Tag color="purple"> 联系电话</Tag>：未填写</td>
      </tr>

      <tr style={{'height':'3em'}}>
      <td><Tag color="purple"> 家庭住址</Tag>：未填写</td>
      </tr>
      </table>
      </TabPane>
      <TabPane tab="修改密码" key="2">
         <div className="alter-password">
          <Input.Password style={{'margin-top': '1em'}} placeholder="输入原密码" />
          <Input.Password style={{'margin-top': '1em'}} placeholder="输入新密码" />
          <Input.Password style={{'margin-top': '1em'}} placeholder="再输入一遍新密码" />
          <Button style={{'margin-top': '1em'}} type="primary">提交</Button>
         </div>
      </TabPane>
      <TabPane tab="购买代币" key="3">
      <Input
        placeholder="请输入你的兑换码"
        prefix={<Icon type="file-unknown" theme="twoTone" />}/>
        <Button style={{'margin-top': '1em'}} type="primary">兑换</Button>
      </TabPane>
      </Tabs>
      </Card>
      </div>
    )
  }
}
export default Personcenter
