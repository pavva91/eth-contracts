// TODO: git clone https://github.com/mudgen/diamond-3-hardhat
// cd diamond-3-hardhat
// put this file inside contracts

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IA {
    function getA() external pure returns (uint);
}

contract A {
    function getA() public pure returns (uint){
        return 42;
    }
}


