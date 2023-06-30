// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract A {
    uint a;

    function setA(uint _a) public {
        a = _a;
    }

    function getA() public view returns (uint) {
        return a;
    }
}

contract B {
    // uint take one entire slot
    // PERF: Optimization memory usage
    // uint are thightly packed together in one slot
    
    // PERF: the order of uint, uint8 and address change the way it optimizes
    // this will be (3 slots of storage):
    // B 0 0x000000000000000000000000000000000000000000000000000000000000f545 // c and d packed together
    // B 1 0x000000000000000000000000000000000000000000000000000000000000003c // b (uint is 256)
    // B 2 0x0000000000000000000000002279b7a0a67db372996a5fab50d91eaa73d2ebe6 // ContractA
    
    // uint8 c;
    // uint8 d;
    // uint b;
    // address ContractA;

    // PERF: the order of uint, uint8 and address change the way it optimizes
    // this will be (2 slots of storage):
    // B 0 0x000000000000000000000000000000000000000000000000000000000000003d // b (uint is 256)
    // B 1 0x00000000000000000000a51c1fc2f0d1a1b8494ed1fe312d7c3a78ed91c0f545 // c and b and ContracA
    uint b;
    uint8 c;
    uint8 d;
    address ContractA;

    constructor(address _A) {
        ContractA = _A;
        b = 4;
        c = 0x45;
        d = 0xF5;
    }

    function setB(uint _a) public {
        b = _a;

        // NOTE: Normal call
        // A(ContractA).setA(_a + 1);

        // NOTE: Delegate Call (we call A in perspective of b)
        // Use contract A in the context (data) of contract B
        ContractA.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _a + 1)
        );
    }

    function getB() public view returns (uint) {
        return b;
    }
}
