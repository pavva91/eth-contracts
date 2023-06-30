// TODO: git clone https://github.com/mudgen/diamond-3-hardhat
// cd diamond-3-hardhat
// put this file inside contracts

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IA {
    function getA() external pure returns (uint256);
    function setA(uint256 _a) external; 
    function incrementA() external; 
}

struct AppStorage {
    uint256 a;
}

library ALib {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("my-storage-location");

    function get() internal pure returns (AppStorage storage s) {
        bytes32 k = DIAMOND_STORAGE_POSITION;
        assembly {
            s.slot := k
        }
    }
}

contract A {
    AppStorage s;

    function setA(uint256 _a) public {
        s.a = _a;
    }

    function incrementA() public {
        s.a = s.a + 1;
    }

    function getA() public view returns (uint256) {
        return s.a;
    }
}
