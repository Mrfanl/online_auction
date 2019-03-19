import React from 'react'
import { Menu } from 'antd'
import './component.css'

class Header_com extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '60px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>

    )
  }
}
export default Header_com
