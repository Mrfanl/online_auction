import React from 'react';
import { List, Avatar,Modal,Tag} from 'antd';
import {connect} from 'react-redux';

import {findAuctionhistory} from '../redux/auctionhistory.redux';
import getCookie from '../utils/getCookie';


class Historyaction extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:getCookie('user'),
      mark:0,//用于记录是拍卖者还是供应商（用于在后端对两者的历史订单请求进行区分）
      visible:false,//用于详情页
      num:0//用于详情页中确定第几个拍卖
    }
  }

  componentWillMount(){
    this.props.findAuctionhistory(this.state.user,this.state.mark);

  }


  showModal = (id)=>{
    this.setState({
      visible:true,
      num:id
    })
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

  render(){
    const data = this.props.historylist;

    return(
      <div>
      {this.props.historylist===0?<img style={{right:'50%'}} src="/empty.PNG" alt="Big Boat"/>:
        <List
          itemLayout="horizontal"
          dataSource={this.props.historylist}
          renderItem={item => (
            <List.Item actions={[<a href={`#${item._id}`} onClick={()=>this.showModal(item._id)}>详情</a>]}>
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
          <Tag color='blue'>买主：</Tag> {data[this.state.num].buyer}<p/>
          <br/>
          <Tag color='blue'>cpu：</Tag>  {data[this.state.num].cpu}<p/>
          <br/>
          <Tag color='blue'>gpu：</Tag>  {data[this.state.num].gpu}<p/>
          <br/>
          <Tag color='blue'>内存：</Tag>  {data[this.state.num].memory}<p/>
          <br/>
          <Tag color='blue'>带宽: </Tag>  {data[this.state.num].band}<p/>
          <br/>
          <Tag color='blue'>花费：</Tag>  {data[this.state.num].cost}<p/>
          <br/>
          <Tag color='blue'>时间: </Tag>  {data[this.state.num].buytime}<p/>
          </div>:null}

        </Modal>
        </div>
    );
  }
}

Historyaction = connect(state=>state.auctionhistory,{findAuctionhistory})(Historyaction)

export default Historyaction
