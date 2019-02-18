import React from 'react';
import { Input,Button,Card} from 'antd';
import { connect } from 'react-redux';
import getCookie from '../utils/getCookie'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
}from "bizcharts";

import { insertAction,findOneAuction} from '../redux/auction.redux';

class Auction extends React.Component{
  constructor(props){
    super(props);
    //拍卖的信息
    this.state={
      supplier:'',
      buyer:'',
      cpu:0,
      gpu:0,
      memory:0,
      band:0,
      //与区块链交互的内容
      cost:''
    }
  }

  componentWillMount(){
    this.setState({
      supplier:this.props.match.params.supplier,
      buyer:getCookie('user')
    })
    this.props.findOneAuction(this.props.match.params.supplier)
  }

  onChange =(d,v)=>{
     this.setState({
       [d]:v
     })
  }
  summit =()=>{
    console.log(this.state)
    this.props.insertAction(this.state)
    this.props.findOneAuction(this.state.supplier)
  }

  render(){

    return (
      <div>
      <Card title={`${this.props.match.params.supplier}的在售商品`} bordered={false} style={{ width:'100%'}}>
      <p>CPU: {this.props.cpu} 个</p>
      <p>GPU: {this.props.gpu} 个</p>
      <p>内存：{this.props.memory} GB</p>
      <p>带宽：{this.props.band} M</p>
      </Card>
      <Input placeholder="cpu" style={{width:'50%'}} onChange={(e)=>this.onChange("cpu",e.target.value)}/><p/>
      <Input placeholder="gpu" style={{width:'50%'}} onChange={(e)=>this.onChange("gpu",e.target.value)}/><p/>
      <Input placeholder="memory" style={{width:'50%'}} onChange={(e)=>this.onChange("memory",e.target.value)}/><p/>
      <Input placeholder="band" style={{width:'50%'}} onChange={(e)=>this.onChange("band",e.target.value)}/><p/>
      <Input placeholder="cost" style={{width:'50%'}} onChange={(e)=>this.onChange("cost",e.target.value)}/><p/>

      <Button type="primary" onClick={()=>this.summit()}>提交</Button>
      </div>
    )
  }
}

Auction = connect(state=>state.auction,{ insertAction,findOneAuction})(Auction)

export default Auction
