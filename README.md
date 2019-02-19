#### 进度备案
>  已完成

*  注册登录 拍卖城界面 拍卖历史记录页面
*  注册登录后端模块

>  未完成  （简约版）

*  登录界面左部跑马灯图片放置
*  注册逻辑密码加hash
*  供应商界面编写
*  供应商界面与后台供应商品直接的对接
*  拍卖历史界面与数据库拍卖历史记录之间的对接，拍卖详情
*  个人中心界面
*  竞拍弹窗的编写
*  后端solidity编写
*  与区块链的交互
*  等等

>下一步

*  编写供应商界面和数据库供应商品之间对接
*  注册密码的hash转换

>2018/12/11 修改记录

 * 增加一个供应商的在售商品界面
 ######  下一步
 *  完成供应商修改商品界面的弹出框
 *  供应商和拍卖者的个人中心

>2018/12/12修改记录

* 完成了供应商修改界面的弹出框以及与数据库的对接

   ###### 下一步
   *  完成供应商的初始化界面，以及供应商身份的传递
   *  供应商和拍卖者的个人中心
   *  拍卖者页面的拍卖城界面的编写

>2018/12/13修改记录

  *完成拍卖城主题内容和分页条的编写

>2018/12/16修改记录
  *完成了密码的MD5加密
  *发现了在拍卖城界面的分页条上存在bug
>2018/12/17修改记录

 * 构建了拍卖历史数据库
 * 完成了拍卖历史数据的前后端联动
 * 完成了拍卖行为对后端数据库的改动(包括对拍卖历史的添加和拍卖品列表的更新)
 * 完成了拍卖界面跳转的数据传输

>2019/01/15修改记录

  *  登录的权限认证（未登录的用户不能访问除注册界面和登录界面以外的部分）
  *  页面头部的个人信息显示和搜索框，完成了登出功能
  *  完成了cookie的使用
  *  登录注册页面提示信息的展示

>问题：

 1. 智能合约无法部署
 2. 分页条bug未解决


>2019/1/16修改记录

 1.完成了供应商和拍卖者历史拍卖记录的编写
 2.完成了个人中心的初步编写


  ######  下一步
  *  进一步的身份认证
  *  解决bug
  *  构建与区块链联动的部分
  *  重构数据库
  *  重构数据库后相应的界面修改

>2019/2/18
  * 完成了区块链部分的初步部署
  * 实现了个人中心部分中与区块链交互的部分

  ######  下一步
  * 删库，在实现与区块链的交互的情况下重新构建数据库
  * 实现供应商的上线拍卖品与区块链的交互部分

>2019/2/19
  * 实现了供应商向区块链上上架拍卖品的功能
  * 实现了拍卖者向区块链上提交订单的功能
  * 实现了初步的区块链上的拍卖逻辑部分编写

  ######  下一步
  * 修改拍卖历史界面，记录所有拍卖行为，通过与区块链互动，确定是否拍卖成功
  * 增加区块链部分的存储，action页面的商品在售信息改为从区块链上取得
