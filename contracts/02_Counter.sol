// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Counter {
    uint counter;

    // Write state (costs gas)
    function count() public returns (uint) {
        counter++;
        console.log("Counter is now ", counter);
    }

    // Read state (free)
    function getCounter() view public returns (uint) {
        return counter;
    }
}
