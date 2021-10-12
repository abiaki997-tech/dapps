// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


error NotEnoughFunds(uint requested, uint available);

contract MultipleSignatureWallet{
    
    // logs events-list of events-list
    event DepositFunds(address from, uint amount);
    event SubmitTransaction(address from,address to,uint transactionId,uint amount);
    event ConfirmTransaction(address from, uint transactionId);
    event excuteTranscation(address from, address to, uint value,uint transactionId);
     
     
    
    
    // state variables
    
    // owners:true/false
    mapping(address => bool) private groupOfOwners;
    
    // pushed owners in array
    address[] private ownersList;
    
    // pushed pendingTrascationList
    uint[] private pendingTrascationList;
    
    
    // pushed recivedTrascationList
    uint[] private completedTrascationList;
    
    // detail of each Transaction
    struct Transaction {
        address from;
        address to;
        uint value;
        bool executed;
        uint numConfirmations;
        address [] signedSignatured;
        mapping (address => uint8) signature;
        
    }
    
    // array of detail Transaction pushed
    // Transaction[] public transactions;
    
    // transaction object
    mapping (uint => Transaction) private _transactions;
    
    
    // numConfirmationsRequired details
    uint public numConfirmationsRequired;
    
    // transaction index of each
    uint private _transactionIdx;
    
    
    // mapping from tx index => owner => bool -> already inside transaction details
    // mapping(uint => mapping(address => bool)) public isConfirmed;
    
    // depoly first time excuted
    constructor (address [] memory owners,uint numConfirmations){
        
        require(owners.length > 0, "owners required");
        
        require(numConfirmations > 0 && numConfirmations <= owners.length,"minimum confirmations required");
        
        for(uint i=0;i<owners.length;i++){
            
            address specificOwner = owners[i];
            
            // address(0) is a short way to write 0x0000000000000000000000000000000000000000
            
            require( specificOwner != address(0),"Invaild Owner");
            
            require( groupOfOwners[specificOwner] != true,"Owner already exist");
            
             groupOfOwners[specificOwner]  = true;
             
             ownersList.push(specificOwner);
             
        }
        
        
         numConfirmationsRequired = numConfirmations;
        
    }
    
    
    // function modifier
    modifier onlyOwner() { // Modifier
        require(
             groupOfOwners[msg.sender] == true,"Only Owner Access." );
        _;
    }
    
 
    // depoist money
    // fallback() external payable{
        
    //     if(msg.value > 0) {
            
    //       emit DepositFunds(msg.sender, msg.value); 
    //     }
    //     // assed="send ether";
    // }
    
    // recive ether function
     function depositEther () external payable{
         if(msg.value > 0) {
            
          emit DepositFunds(msg.sender, msg.value); 
        }
    }
    
    // getBalance
    function walletBalance() external view returns(uint){
        
        return address(this).balance;
        
    }
    
    // requestWithDraw Amount
    function withDraw(address _to,uint amount) public onlyOwner {
        
        uint balance = address(this).balance;
        
        if (balance < amount){
            revert NotEnoughFunds(amount, balance);
        }
        
        uint transactionId = _transactionIdx++;
        
        Transaction storage t = _transactions[transactionId];
        
        t.from = msg.sender;
        t.to = _to;
        t.value=amount;
        t.executed=false;
        t.numConfirmations=0;
        
        
        pendingTrascationList.push(transactionId);
        emit SubmitTransaction(msg.sender,_to, transactionId,amount);
        

        
    }
    
    // signedTransaction (requestWithDraw)
    function signedTransaction(uint transactionId) public  onlyOwner payable{
        
        
        Transaction storage t = _transactions[transactionId];
        
        require(transactionId <= pendingTrascationList.length, "tx does not exist");
        
        // require(pendingTrascationList.length == 1,"transcation Exist")
        
        require(t.executed != true,"already executed this transcation");
        
        // you are owner transcation not signed
        require(msg.sender != t.to, "You not authorized for this transcation");
        
        // signed transcation not more than once
        require(t.signature[msg.sender] != 1,"already signed transcation");
        
        t.signature[msg.sender] = 1;
        
        t.numConfirmations++;
        
        t.signedSignatured.push(msg.sender);
        
        
        // logs for outside
         emit ConfirmTransaction(msg.sender, transactionId);
         
         if(numConfirmationsRequired == t.numConfirmations){
            
            require(t.value <= address(this).balance ,"less value in account");
            
            t.executed = true;
            
            // transactio n.to.call{value: transaction.value}
            // (request.recipient).transfer(request.value);
            //  (bool success) = t.to.call{value: t.value};
            // t.to.transfer(t.amount);
            
            
            
             payable(t.to).transfer(t.value);
             
             
              uint8 replace = 0;
              for(uint i = 0; i < pendingTrascationList.length; i++) {  
                 if (1 == replace) {
                   pendingTrascationList[i-1] = pendingTrascationList[i];
                 } else if (transactionId == pendingTrascationList[i]) {
                   replace = 1;
                 }
              }
              
              pendingTrascationList.pop();
              
              completedTrascationList.push(transactionId);
              
            
              emit excuteTranscation(t.from, t.to, t.value, transactionId);
             
         }
        
        
        
        
    }
    
    // getlist of pendingTranscation
    function getPendingTranscationList() public onlyOwner view returns (uint [] memory){
        return pendingTrascationList;
    }
    
    
    // getlist of pendingTranscation
    function getCompeltedTranscationList() public onlyOwner view returns (uint [] memory){
        return completedTrascationList;
    }
    
 
    //get each transcationDetails for from,to,amount
    function transcationDetails(uint transactionId) public onlyOwner view returns(address from,address to,uint value,bool executed,uint numConfirmations,address [] memory signedSignatured){
        
        Transaction storage t = _transactions[transactionId];
     return (
            t.from,
            t.to,
            t.value,
            t.executed,
            t.numConfirmations,
            t.signedSignatured
        );
    }
    
   
    
    
    //each address balance specific
    function getEachAddressBalance() public view returns (uint){
      return msg.sender.balance;
    }


    
    
    
    
}