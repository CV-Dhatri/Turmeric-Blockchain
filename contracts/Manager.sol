// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Manager {
    address public owner;
    enum TransportStatus { PENDING, TRANSIT, DELIVERED}
    uint public prodCount;

    struct Prod{    //blockchain data
        uint itemId;
        address sender;
        address receiver;
        string test;
        uint quantity;
        TransportStatus status;
        bool isTested;
        bool isDelivered;
    }

    mapping(address => Prod[]) public prods;

    struct Turmeric{    //front end display
        uint itemId;
        address sender;
        address receiver;
        string test;
        uint quantity;
        TransportStatus status;
        bool isTested;
        bool isDelivered;
    }

    Turmeric[] turmerics;

    event ProdProducer(uint itemId, address indexed sender, address receiver, string test, uint quantity);
    event ProdTransit(uint itemId, address indexed sender, address receiver,  uint quantity);
    event ProdDelivered(uint itemId, address indexed sender, address receiver, uint quantity);
    event ProdTested(uint itemId, address indexed sender, address receiver, string test);

    constructor() {
        prodCount = 0;
    }

    function produceProd(uint _itemId, address _receiver, string memory _test, uint _quantity) public payable 
    {
        require(msg.value == _quantity, "Insufficient quantity.");

        Prod memory prod = Prod(_itemId, msg.sender, _receiver, _test, _quantity, TransportStatus.PENDING , false, false);

        prods[msg.sender].push(prod);
        prodCount++;

        turmerics.push(
            Turmeric(
                _itemId,
                msg. sender,
                _receiver,
                _test,
                _quantity,
                TransportStatus.PENDING,
                false,
                false
                )
        );
          emit ProdProducer(_itemId, msg.sender, _receiver, _test, _quantity);
    }

    function startProd(uint _itemId, address _sender, address _receiver, uint _quantity, uint _index) public 
    {
        Prod storage prod = prods[_sender][_index];
        Turmeric storage turmeric = turmerics[_index];
        require(prod.receiver == _receiver, "Incorrect receiver.");
        require(prod.status == TransportStatus.PENDING, "Wrong status of transport.");

        prod.status = TransportStatus.TRANSIT;
        turmeric.status = TransportStatus.TRANSIT;

        emit ProdTransit( _itemId, _sender, _receiver, _quantity);
    }

    function completeProd(uint _itemId, address _sender, address _receiver, uint _index) public 
    {
        Prod storage prod = prods[_sender][_index];
        Turmeric storage turmeric = turmerics[_index];

        require(prod.receiver == _receiver, "Incorrect receiver.");
        require(prod.status == TransportStatus.TRANSIT, "Wrong status of transport.");
        require(!prod.isDelivered, "Product is already delivered.");

        prod.status = TransportStatus.DELIVERED;
        turmeric.status = TransportStatus.DELIVERED;
        
        uint nop = prod.quantity; //number of products
        string memory testing = prod.test; //test result or name

        payable(prod.sender).transfer(nop);

        prod.isDelivered = true;
        turmeric.isDelivered = true;
        if(true)
        {
            prod.isTested = true;
            turmeric.isTested = true;
        }

        emit ProdDelivered(_itemId, _sender, _receiver, nop);
        emit ProdTested(_itemId, _sender, _receiver, testing);
    }

    function getProd(address _sender, uint _index) public view returns (uint, address, address, uint, string memory, TransportStatus, bool, bool) 
    {
        Prod memory prod = prods[_sender][_index];
        return (prod.itemId, prod.sender, prod.receiver, prod.quantity, prod.test, prod.status, prod.isDelivered, prod.isTested);
    }

    function getProdCount(address _sender) public view returns (uint)
    {
        return prods[_sender].length;
    }

    function getTransactions() public view returns (Turmeric[] memory)
    {
        return turmerics;
    }
}