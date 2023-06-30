// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./04_Hero.sol";

contract TestHero is Hero {
    uint random;

    function generateRandom() public view override returns (uint) {
        return random;
    }

    function setRandom(uint r) public {
        random = r;
    }
}
