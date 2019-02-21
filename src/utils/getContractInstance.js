import getWeb3 from './getWeb3';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

const contractAddress = '0xd1b2e5e7315db883dc1b6f55de9e9ce5788eb6fd'

var contractInstance

var getContractInstance = getWeb3.then(res=>{
  const contract = require('truffle-contract');
  const SimpleStorage = contract(SimpleStorageContract);
  SimpleStorage.setProvider(res.web3.currentProvider)
  contractInstance =  SimpleStorage.at(contractAddress)
  return contractInstance;
})
console.log(getContractInstance)
export default getContractInstance
