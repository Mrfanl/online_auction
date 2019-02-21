import React from 'react';
import { List, Avatar,Icon,Modal,Tag} from 'antd';
import {connect} from 'react-redux';

import {findAuctionhistory} from '../redux/auctionhistory.redux';
import getCookie from '../utils/getCookie';
import getWeb3 from '../utils/getWeb3';
import getContractInstance from '../utils/getContractInstance';


class Historyaction extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:getCookie('user'),
      mark:0,//用于记录是拍卖者还是供应商（用于在后端对两者的历史订单请求进行区分）
      visible:false,//用于详情页
      num:0,//用于详情页中确定第几个拍卖,
      cpu:'',
      gpu:'',
      memory:'',
      band:'',
      isSucess:false//用于指明拍卖是否成功
    }
  }

  componentWillMount(){
    this.props.findAuctionhistory(this.state.user,this.state.mark);

  }


  showModal = (id,supplier)=>{
    this.setState({
      visible:true,
      num:id
    })
    this.instantiateContract(supplier)
  }

  handleok = (e)=>{
    this.setState({
      visible:false
    })
  }

  handleCancel = (e) => {
  this.setState({
    visible: false,
  });
}

instantiateContract(supplier){
getWeb3.then(res=>{
  res.web3.eth.getAccounts((error,accounts)=>{
       getContractInstance.then(instance=>{
         instance.setRource(this.state.user,supplier,{from:accounts[0]})
         instance.getRource(this.state.user,{from:accounts[0]}).then(res=>{
           console.log(res)
           this.setState({
             cpu:res[0].c,
             gpu:res[1].c,
             memory:res[2].c,
             band:res[3].c
           })
           if(Number(res[0].c)!==0|Number(res[1].c)!==0|Number(res[2].c)!==0|Number(res[3].c)!==0){
             this.setState({
               isSucess:true
             })
           }else{
             this.setState({
               isSucess:false
             })
           }

         })
       })
     })
     })
}

  render(){
    const data = this.props.historylist;

    return(
      <div>
      {this.props.historylist==0?<img style={{right:'50%'}} src="/empty.PNG" alt="Big Boat"/>:
        <List
          itemLayout="horizontal"
          dataSource={this.props.historylist}
          renderItem={item => (
            <List.Item actions={[<a href={`#${item._id}`} onClick={()=>this.showModal(item._id,data[item._id].supplier)}>详情</a>]}>
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="file-done" />}
                title={item.supplier}
                description={`拍卖时间：${item.buytime}`}
              />
            </List.Item>
          )}
        />}

        <Modal
           title="详情"
           visible={this.state.visible}
           onOk={this.handleok}
           onCancel={this.handleCancel}
        >
        {data.length!==0?<div>
          <Tag color='blue'>店铺：</Tag> {data[this.state.num].supplier}<p/>
          <br/>
          <Tag color='blue'>cpu：</Tag>  {this.state.isSucess?data[this.state.num].cpu:this.state.cpu}<p/>
          <br/>
          <Tag color='blue'>gpu：</Tag>  {this.state.isSucess?data[this.state.num].gpu:this.state.gpu}<p/>
          <br/>
          <Tag color='blue'>内存：</Tag>  {this.state.isSucess?data[this.state.num].memory:this.state.memory}<p/>
          <br/>
          <Tag color='blue'>带宽: </Tag>  {this.state.isSucess?data[this.state.num].band:this.state.band}<p/>
          <br/>
          <Tag color='blue'>花费：</Tag>  {this.state.isSucess?data[this.state.num].cost:0}<p/>
          <br/>
          <Tag color='blue'>时间: </Tag>  {data[this.state.num].buytime}<p/>
          <br/>
          <Tag color='blue'>拍买成功: </Tag>  {this.state.isSucess?'是':'否'}<p/>
          </div>:null}

        </Modal>
        </div>
    );
  }
}

Historyaction = connect(state=>state.auctionhistory,{findAuctionhistory})(Historyaction)

export default Historyaction
