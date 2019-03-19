import getWeb3 from './getWeb3';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

const contractAddress = '0x435622795f10b5b5ce84eca54d1d06c2970657cd'

var contractInstance

var getContractInstance = getWeb3.then(res=>{
  const contract = require('truffle-contract');
  const SimpleStorage = contract(SimpleStorageContract);
  SimpleStorage.setProvider(res.web3.currentProvider)
  impleStorage.deployed().then((instance)={
    contractInstance = instance;
  })
  return contractInstance;
})
export default getContractInstance
