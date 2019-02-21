import React from 'react'
import { Avatar,Card,Tag } from 'antd';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import getCookie from '../utils/getCookie';
import getWeb3 from '../utils/getWeb3';
import getContractInstance from '../utils/getContractInstance';

const { Meta } = Card


var SimpleStorageInstance;
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
    })})
    this.instantiateContract()
}


instantiateContract(){
getWeb3.then(res=>{
  res.web3.eth.getAccounts((error,accounts)=>{
       getContractInstance.then(instance=>{
         instance.getBalance(this.state.user,{from:accounts[0]}).then(results=>{
         this.setState({
           balance:results.c[0]
         })
       })
     })
     })
     })
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
      </Card>

      <Card>
      </Card>
      </div>
    )
  }

}

export default Personcenter
