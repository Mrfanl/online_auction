import React from 'react'
import { Carousel} from 'antd'

class Content_com extends React.Component{


  render(){
    return (
        <Carousel  effect="fade" autoplay >
           <div><h3 style={{'color':'#fff'}}>1</h3></div>
           <div><h3 style={{'color':'#fff'}}>2</h3></div>
           <div><h3 style={{'color':'#fff'}}>3</h3></div>
           <div><h3 style={{'color':'#fff'}}>4</h3></div>
        </Carousel>
    )
  }
}

export default Content_com
