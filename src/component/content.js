import React from 'react'
import { Carousel} from 'antd'

class Content_com extends React.Component{


  render(){
    return (
        <Carousel  effect="fade" autoplay >
           <div><h1>1</h1></div>
           <div><h1>2</h1></div>
           <div><h1>3</h1></div>
           <div><h1>4</h1></div>
        </Carousel>
    )
  }
}

export default Content_com
