import React from 'react';
import { Card,Modal,Button,Divider,InputNumber,Input,Statistic,Skeleton,Row,Col} from 'antd';
import { connect } from 'react-redux';

import { updateActionlist} from '../redux/actionlist.redux';
import { findOneAuction } from '../redux/auction.redux';
import getCookie from '../utils/getCookie'
import getWeb3 from '../utils/getWeb3';
import getContractInstance from '../utils/getContractInstance';

const Countdown = Statistic.Countdown;

class Auctionlist extends React.Component{
  constructor(props){
    super(props);
    this.state={
      //商家名字
      user:'',
      //cpu个数
      cpu:0,
      //gpu个数
      gpu:0,
      //内存容量
      memory:0,
      //带宽
      band:0,
      //下面用于记录拍卖结束的时长
      duration_time:0,
      //是否禁售
      isSuccess:false,
      //下面用于商品修改的弹出框的设置
      visible:false,
      ModalText:'Content of the modal',
      confirmLoading:false
    }
  }
  componentWillMount(){
    this.setState({
      user:getCookie('user')
    });
    this.props.findOneAuction(getCookie('user'));
    this.setState({
      cpu:this.props.auction.cpu,
      gpu:this.props.auction.gpu,
      memory:this.props.auction.memory,
      band:this.props.auction.band,
      duration_time:this.props.auction.duration_time
    })
    console.log(this.state.duration_time);
  }

  showModal = ()=>{
    this.setState(
      {
        visible:true,
      }
    )
  }

  handleOK = ()=>{
    this.setState({
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true,
      });
        this.instantiateContract();
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 1000);

      setTimeout(() => {
        this.props.updateActionlist(this.state);
      }, 1000);


  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleSale = () => {
    this.setState({
      isSale:!this.state.isSale
    });
    setTimeout(() => {
      this.props.updateActionlist(this.state);
    }, 1000);

  }

  onChange = (k,v) =>{
    if(k=="duration_time"){
      this.setState({
        [k]:v*60*1000+ Date.now()
      });
      console.log(this.state.duration_time)
    }
    else{
      this.setState({
        [k]:v
      });
    }
  }

  changeName = (value) =>{
    this.setState({
      user:value
    });
  }

  //倒计时结束，意味着拍卖活动结束
  onFinish(){
    console.log("FInished");
    this.setState({
      isSuccess:true
    });
  }

//将商品在区块链上注册
  instantiateContract(){
  getWeb3.then(res=>{
    res.web3.eth.getAccounts((error,accounts)=>{
         getContractInstance().then(instance=>{
           instance.startBusiness(this.state.user,this.state.cpu,this.state.gpu,this.state.memory,this.state.band,(this.state.duration_time-Date.now())/1000,{from:accounts[0]});
       });
     });
   });
  }

  allocation(){
  getWeb3.then(res=>{
    res.web3.eth.getAccounts((error,accounts)=>{
         getContractInstance().then(instance=>{
           instance.allocation({from:accounts[0]});
       });
     });
   });
  }

  exchange(){
  getWeb3.then(res=>{
    res.web3.eth.getAccounts((error,accounts)=>{
         getContractInstance().then(instance=>{
           instance.exchange({from:accounts[0]});
       });
     });
   });
  }

  render(){
    const { cpu,gpu,memory,band } = this.state;
    return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title="您的在售商品" bordered={false} style={{ width:'100%'}}>
      <Row gutter={16}>
          <Col span={6}>
          <p>CPU: {this.state.cpu} 个</p>
          <p>GPU: {this.state.gpu} 个</p>
          <p>内存：{this.state.memory} GB</p>
          <p>带宽：{this.state.band} M</p>
          {this.state.isSale?<div style={{color:'rgb(0,0,255)'}}>销售中</div>:<div style={{color:'red'}}>禁售中</div>}
          </Col>
          <Col span={6}>
          {this.state.duration_time==0?<span>还未上架您的拍卖品</span>:<Countdown title="距拍卖结束还剩：" value={this.state.duration_time} onFinish={this.onFinish} format="H 时 m 分 s 秒"/>}
          </Col>
       </Row>
      </Card>
      <p/>
      <Row>
      <Col span={6} >
      <Button type="primary" style={{'marginRight':'1em'}} onClick={this.showModal}>
         上架商品
      </Button>
      <Button type="primary" onClick={this.handleSale}>
        {this.state.isSale?<div>禁售商品</div>:<div>开售商品</div>}
      </Button>
      </Col>
      <Col span={6}>
       {this.state.isSuccess?
         <div>
           <Button type="primary" style={{'marginLeft':'1em'}} onClick={()=>this.allocation()}>
              分配商品
           </Button>
           <Button type="primary" style={{'marginLeft':'1em'}} onClick={()=>this.exchange()}>
              交易收费
           </Button>
          </div>:
        null}
        </Col>
      </Row>
      <Modal
        title="修改中"
        visible={this.state.visible}
        onOk={this.handleOK}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}>
        CPU:   <InputNumber style={{width:100}} min={1} max={200} defaultValue={this.state.cpu} onChange={(value)=>this.onChange('cpu',value)}/> 个<p/>
        GPU:   <InputNumber style={{width:100}} min={1} max={200} defaultValue={this.state.gpu} onChange={(value)=>this.onChange('gpu',value)}/> 个<p/>
        内存:   <InputNumber style={{width:100}} min={1} max={100} defaultValue={this.state.memory} onChange={(value)=>this.onChange('memory',value)}/> GB<p/>
        带宽:   <InputNumber style={{width:100}} min={1} max={1000} defaultValue={this.state.band} onChange={(value)=>this.onChange('band',value)}/> M<p/>
        时长：  <InputNumber style={{width:100}} min={1} max={1000} defaultValue={this.state.hour} onChange={(value)=>this.onChange('duration_time',value)}/> 小时<p/>
      </Modal>
      <Divider type="vertical"/>

   </div>
    )
  }
}

Auctionlist = connect(state=>state,{updateActionlist,findOneAuction})(Auctionlist)

export default Auctionlist;
