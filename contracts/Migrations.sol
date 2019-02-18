pragma solidity ^0.4.18;

contract SimpleStorage{

    struct Bid{
        string Name;//拍卖者用户名或者供应商用户名
        uint Cpu;
        uint Gpu;
        uint Memory;
        uint Band;
        uint Cost;

    }

    struct Business{
        uint Cpu;
        uint Gpu;
        uint Memory;
        uint Band;
        uint Cost;
        uint EndTime;//拍卖结束时间
    }

    struct Business_ltera{
        mapping(string=>Bid[]) successBids;//每个拍卖者对应的成功的投标
        mapping(uint=>string) successBids_lterable;//用于对成功投标的遍历
        uint size;
    }

    //记录拍卖的虚拟机的各部分的成本价格之比
    mapping(string=>uint) worthratio;

    uint public initBalance =100;//初始金额，只能由合约创建者修改
    mapping(string=>uint)  balanceOf;//记录每个用户（包括拍卖者和供应商）的金额

    address public minter;//合约创建者
    mapping(string=>Bid[])  bids;//每个供应商对应的投标
    string[] public startedSupplier;//记录有拍卖活动的供应商
    mapping(string=>Business) business;//记录开始拍卖的供应商的拍卖品和拍卖结束时间


    Business_ltera successBids_ltera;//每个拍卖者成功的投标（可遍历）



    constructor() public{
        minter = msg.sender;
        //确立虚拟机各部分的价格之比为 cpu:gpu:memory:band = 5:10:2:1
        worthratio["cpu"] = 5;
        worthratio["gpu"] = 10;
        worthratio["memory"] = 2;
        worthratio["band"] = 1;
    }

    //改变用户的初始金额（只有合约的创建者才能调用）
    function changeInitBalance(uint _initBalance) public{
        if(msg.sender!=minter) return;
        initBalance = _initBalance;
    }

    //将用户注册在区块链上
    function register(string memory _name) public{
        balanceOf[_name] = initBalance;
    }

    //查询用户的余额
    function getBalance(string memory _name) public view returns(uint){
        return balanceOf[_name];
    }


}
