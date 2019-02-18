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

    //将用户的投标根据供应商的不同进行存储
    function bidding(string memory _supplier,string memory _name,uint _cpu,uint _gpu,uint _memory,uint _band,uint _cost) public {
        if(_cpu<=business[_supplier].Cpu&&_gpu<=business[_supplier].Gpu&&_memory<=business[_supplier].Memory&&_band<=business[_supplier].Band){
            bids[_supplier].push(Bid({
                Name:_name,
                Cpu:_cpu,
                Gpu:_gpu,
                Memory:_memory,
                Band:_band,
                Cost:_cost

            }));
        }
    }

    //由供应商调用，代表上架拍卖品
    function startBusiness(string memory _supplier,uint _cpu,uint _gpu,uint _memory,uint _band,uint _time) public{
        Business storage bus = business[_supplier];
        bus.Cpu = _cpu;
        bus.Gpu = _gpu;
        bus.Memory = _memory;
        bus.Band = _band;
        bus.EndTime = now + _time;
        startedSupplier.push(_supplier);
    }

    //分配资源,遍历bids
    function allocation() internal {
        uint log = 0;//在成功分配订单中的记录

        for(uint i=0;i<startedSupplier.length;i++){
            Bid[] storage bs = bids[startedSupplier[i]];
            sortbids(bs);
            for(uint j=0;j<bs.length;j++){
                uint[] memory sum ;//记录订单中虚拟机每部分的数量之和
                sum[0] += bs[j].Cpu;
                sum[1] += bs[j].Gpu;
                sum[2] += bs[j].Memory;
                sum[3] += bs[j].Band;
                Business storage bus = business[startedSupplier[i]];

                if(sum[0]<=bus.Cpu&&sum[1]<=bus.Gpu&&sum[2]<=bus.Memory&&sum[3]<=bus.Band){
                    successBids_ltera.successBids[bs[j].Name].push(bs[j]);
                    successBids_ltera.successBids_lterable[log] = bs[j].Name;
                    successBids_ltera.size++;

                }else{
                    sum[0] = 0;
                    sum[1] = 0;
                    sum[2] = 0;
                    sum[3] = 0;
                    break;
                }

            }
        }

    }

    //对每个订单按照单价的从高到低进行排序，用于分配资源（待修改）

    function sortbids(Bid[] storage bs) internal{
        for(uint i=0;i<bs.length-1;i++){
            for(uint j=0;j<bs.length-i-1;j++){
                uint  num1 = bs[j].Cpu*worthratio["cpu"]+bs[j].Gpu*worthratio["gpu"]+bs[j].Memory*worthratio["memory"]+bs[j].Band*worthratio["band"];
                uint  num2 = bs[j+1].Cpu*worthratio["cpu"]+bs[j+1].Gpu*worthratio["gpu"]+bs[j+1].Memory*worthratio["memory"]+bs[j+1].Band*worthratio["band"];
                if(bs[j].Cost/num1<bs[j].Cost/num2){
                    Bid storage tmp = bs[j];
                    bs[j] = bs[j+1];
                    bs[j+1] = tmp;
                }
            }
        }
    }

    //对成功拍卖的订单进行收费给供应商
    function exchange() internal{
       successBids_ltera.size;

        for(uint i=0;i<successBids_ltera.size;i++){
            string memory _user = successBids_ltera.successBids_lterable[i];
            Bid[] storage bids = successBids_ltera.successBids[_user];//用户的投标
            uint costSum = 0;
            for(uint j=0;j<bids.length;j++){
                costSum = costSum+bids[j].Cost;
                balanceOf[bids[j].Name] += bids[j].Cost;
            }
            balanceOf[_user] -= costSum;
        }
    }

   /* // 返回用户得到的资源分配
    function getRource(string memory _user) public view returns(){
        return successBids_ltera.successBids[_user];
    } */



}
