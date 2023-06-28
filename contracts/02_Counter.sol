// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Counter {
    uint counter;

    event CounterInc(uint counter);

    // Write state (costs gas)
    function count() public returns (uint) {
        counter++;
        console.log("Counter is now ", counter);
        emit CounterInc(counter); // Emit for everybody
        // emit CounterInc(msg.sender, counter); // Emit only for the sender
    }

    // Read state (free)
    function getCounter() public view returns (uint) {
        return counter;
    }
}
