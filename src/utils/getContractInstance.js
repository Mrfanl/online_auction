import getWeb3 from './getWeb3';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

const contractAddress = '0xdd5e971f070ca650600dc0100fc08edb488cba7e'

var contractInstance

var getContractInstance = getWeb3.then(res=>{
  const contract = require('truffle-contract');
  const SimpleStorage = contract(SimpleStorageContract);
  SimpleStorage.setProvider(res.web3.currentProvider)
  contractInstance =  SimpleStorage.at(contractAddress)
  return contractInstance;
})
export default getContractInstance
