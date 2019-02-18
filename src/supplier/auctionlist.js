import React from 'react';
import { Card,Modal,Button,Divider,InputNumber,Input} from 'antd';
import { connect } from 'react-redux';

import { updateActionlist } from '../redux/actionlist.redux';
import getCookie from '../utils/getCookie'


class Auctionlist extends React.Component{
  constructor(props){
    super(props);
    this.state={
      //商家名字
      user:'',
      //cpu个数
      cpu:1,
      //gpu个数
      gpu:1,
      //内存容量
      memory:'8',
      //带宽
      band:'100',
      //是否禁售
      isSale:true,
      //下面用于商品修改的弹出框的设置
      visible:false,
      ModalText:'Content of the modal',
      confirmLoading:false
    }
  }
  componentWillMount(){
    this.setState({
      user:getCookie('user')
    })
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
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 1000);

      setTimeout(() => {
        console.log(this.state)
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
    })
    setTimeout(() => {
      this.props.updateActionlist(this.state);
    }, 1000);
  }

  onChange = (k,v) =>{
    this.setState({
      [k]:v
    })
  }

  changeName = (value) =>{
    this.setState({
      user:value
    })
  }



  render(){
    const { cpu,gpu,memory,band } = this.state
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="您的在售商品" bordered={false} style={{ width:'100%'}}>
    <p>CPU: {this.state.cpu} 个</p>
    <p>GPU: {this.state.gpu} 个</p>
    <p>内存：{this.state.memory} GB</p>
    <p>带宽：{this.state.band} M</p>
    {this.state.isSale?<div style={{color:'rgb(0,0,255)'}}>销售中</div>:<div style={{color:'red'}}>禁售中</div>}
    </Card>
    <p/>
    <Button type="primary" onClick={this.showModal}>
       修改商品
    </Button>
    <Modal
      title="修改中"
      visible={this.state.visible}
      onOk={this.handleOK}
      confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
    >

    CPU:   <InputNumber style={{width:100}} min={1} max={200} defaultValue={this.state.cpu} onChange={(value)=>this.onChange('cpu',value)}/> 个<p/>
    GPU:   <InputNumber style={{width:100}} min={1} max={200} defaultValue={this.state.gpu} onChange={(value)=>this.onChange('gpu',value)}/> 个<p/>
    内存:   <InputNumber style={{width:100}} min={1} max={100} defaultValue={this.state.memory} onChange={(value)=>this.onChange('memory',value)}/> GB<p/>
    带宽:   <InputNumber style={{width:100}} min={1} max={1000} defaultValue={this.state.band} onChange={(value)=>this.onChange('band',value)}/> M<p/>
    </Modal>
    <Divider type="vertical"/>
    <Button type="primary" onClick={this.handleSale}>
      {this.state.isSale?<div>禁售商品</div>:<div>开售商品</div>}

    </Button>
  </div>
    )
  }
}

Auctionlist = connect(state=>state,{updateActionlist})(Auctionlist)

export default Auctionlist;
