//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Greeter {
  string greeting;

  constructor(string memory _greting) {
    console.log("Deploying a Greeter with greeting:", _greting);
    greeting = _greting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

 function getavu() public pure returns (string memory) {
    return "abi king";
  }

   
  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
