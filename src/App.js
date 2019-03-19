import React, { Component } from 'react'//导入react插件？

//导入合约内容，经过truffle compile之后，编译生成build文件夹，不过此时智能合约还没有部署
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

//从./utils文件夹中导入getWeb3
import getWeb3 from './utils/getWeb3'



import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
const contractAddress = "0xa7d070d6b24db33492340dad8575bfc41ad7db80"

class App extends Component {//这是什么标签，以及下面的constructor
  constructor(props) {
    super(props)
    this.state = {  //这里的this什么意思。App？
      storageValue: 0,
      web3: null,
    }
  }
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {            //这里的代码如何解释？为什么这么写？
      this.setState({
        web3: results.web3
      })   //这里的setState怎么理解，有直接的函数吗

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }




  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

     //初始化合约

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)


  /*  this.state.web3.eth.getAccounts((error,accounts)=>{
      simpleStorage.new().then(function(instance){
        console.log(instance.address)
      }).catch(function(err){

      })
    })*/

    simpleStorage.at(contractAddress).then(function(instance) {
      // Print the new address
      console.log(instance.address);
    }).catch(function(err) {
      // There was an error! Handle it.

      console.log(err)
    });



/*

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.at(contractAddress).then((instance) => {
        console.log(instance.address)
        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })

*/
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
