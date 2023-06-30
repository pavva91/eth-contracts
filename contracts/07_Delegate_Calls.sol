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
    uint b;
    address ContractA;

    constructor(address _A) {
        ContractA = _A;
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
