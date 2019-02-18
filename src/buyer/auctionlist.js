import React from 'react';
import { Card,Col,Row,Pagination,Button} from 'antd';
import {connect} from 'react-redux'

import { queryActionlist } from '../redux/actionlist.redux'

class Auctionlist extends React.Component{
  constructor(props){
    super(props);
    this.state={
      pageNum:1,
      pageSize:9
    }
  }

  componentWillMount(){
    this.props.queryActionlist()
  }

onChange(page){
   this.setState({
     pageNum:page
   })
 }

 changePageSize(current,size){
   this.setState({
     pageSize:size
   })

 }

  render(){
    console.log(this.state.pageNum)
    const auctionlistSlice = this.props.auctionlist.slice((this.state.pageNum-1)*this.state.pageSize,(this.state.pageNum-1)*this.state.pageSize+this.state.pageSize);
    return (
  <div style={{ background: '#ECECEC', padding: '30px' }}>
   <Row gutter={16}>
    {auctionlistSlice.map(v=>(
      <Col span={8} key={v.user}>
      <Card  extra={<a href={`/buyer/auction/${v.user}`} ><Button type="danger" >竞拍</Button></a>}  title={v.user} bordered={false}>Card content</Card>
      <p/>
      </Col>
    ))}
    </Row>
    <Pagination style={{'textAlign':'center'}} Current={this.state.pageNum} pageSize={this.state.pageSize}  showSizeChanger  onShowSizeChange={this.changePageSize.bind(this)} onChange={this.onChange.bind(this)} total={this.props.auctionlist.length}  />
  </div>
    )
  }
}

Auctionlist = connect(state=>state.actionlist,{queryActionlist})(Auctionlist)

export default Auctionlist
