import getWeb3 from './getWeb3';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
function getContract(){
 return  getWeb3.then(res=>{
  const contract = require('truffle-contract');
  const SimpleStorage = contract(SimpleStorageContract);
  SimpleStorage.setProvider(res.web3.currentProvider);
   return SimpleStorage;
});
}
export default function getContractInstance(){
return getContract().then(SimpleStorage=>{
   var promise = SimpleStorage.deployed({gas:6012388012}).then((instance)=>{
          return instance;
        });
    return promise;
 }
);
}
