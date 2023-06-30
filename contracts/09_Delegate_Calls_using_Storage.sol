// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "./08_Storage.sol";

contract AS {
    AppStorage s;

    function setA(uint _a) public {
        s.a = _a;
    }

    function getA() public view returns (uint) {
        return s.a;
    }
}

contract BS {
    AppStorage s;

    constructor(address _A) {
        s.ContractA = _A;
        s.b = 4;
        s.c = 0x45;
        s.d = 0xF5;
    }

    function setB(uint _b) public {
        s.b = _b;
        (bool success, bytes memory bbb) = s.ContractA.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );
        console.log("success", success);
    }

    function getB() public view returns (uint) {
        return s.b;
    }
}
