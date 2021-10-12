// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


contract FilesHash{
    
 string ipfsHash;
 
 function sendHash(string memory x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string memory  x) {
   return ipfsHash;
 }
 
}
