import getWeb3 from './getWeb3';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

const contractAddress = '0xbdb36d890171de28b36c2a0595aff9ebd144a8f5'

var contractInstance

var getContractInstance = getWeb3.then(res=>{
  const contract = require('truffle-contract');
  const SimpleStorage = contract(SimpleStorageContract);
  SimpleStorage.setProvider(res.web3.currentProvider)
  contractInstance =  SimpleStorage.at(contractAddress)
  return contractInstance;
})
export default getContractInstance
