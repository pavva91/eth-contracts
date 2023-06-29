// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// DESIGN
// - Generate random Heroes
// - The user gets to put in their class of hero on generation
//     - classes: Mage, Healer, Barbarian
//     - Class will not influence stats created, therefore getting an epic hero will be hard
// - I want to be paid:
//     - 0.05 ETH per hero
// - I should be able to get mmy heroes I have generated
// - Heroes should be stored on the chain
// - Stats are: strength, health, intellect, magic, dexterity
// - Stats are randomly generated
//     - A scale of 1-18
//     - The stats are randomly picked and their amplitude is randomly dtermined according to the following:
//         - Stat 1 can max at 18
//         - Stat 2 can max at 17
//         - Stat 3 can max at 16
// - You could imagine these being an NFT
//     - They are non divisable

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send more money");
    }
}
