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
// - Stats are: strength, health, dexterity, intellect, magic
// - Stats are randomly generated
//     - A scale of 1-18 (18 can be represented on binary as 0b10010, so only 5 bits are needed to represent each stat)
//     - The stats are randomly picked and their amplitude is randomly dtermined according to the following:
//         - Stat 1 can max at 18
//         - Stat 2 can max at 17
//         - Stat 3 can max at 16
// - You could imagine these being an NFT
//     - They are non divisable

contract Hero {
    enum Class {
        Mage, // 0, 0b00
        Healer, // 1, 0b01
        Barbarian // 2, 0b11
    }

    // Takes addresses and produces out arrays
    mapping(address => uint[]) addressToHeroes;

    // FIX: for NFTs use chainlinkVRF to generate random numbers (https://vrf.chain.link/)
    function generateRandom() public view virtual returns (uint) {
        return
            uint(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            );
    }

    // Provider is enough
    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getStrength(uint hero) public view returns (uint32) {
        return uint32((hero >> 2) & 0x1F);
        // with hero >> 2 we shifted the class off and now strenght represents the first 5 bits
        // Select out only the first 5 bits: 0x1F = 0b11111
    }

    function getHealth(uint hero) public view returns (uint32) {
        return uint32((hero >> 7) & 0x1F);
    }

    function getDexterity(uint hero) public view returns (uint32) {
        return uint32((hero >> 12) & 0x1F);
    }

    function getIntellect(uint hero) public view returns (uint32) {
        return uint32((hero >> 17) & 0x1F);
    }

    function getMagic(uint hero) public view returns (uint32) {
        return uint32((hero >> 22) & 0x1F);
    }

    // Signer is needed
    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send more money");

        // Stats are: strength, health, dexterity, intellect, magic
        uint[] memory stats = new uint[](5);
        stats[0] = 2; // represent strenght (first 2 bits are the enum 0b00 is Mage, 0b01 is Healer, 0b11 is Barbarian)
        stats[1] = 7; // represent health
        stats[2] = 12; // represent dexterity
        stats[3] = 17; // represent intellect
        stats[4] = 22; // represent magic

        uint len = 5;
        uint hero = uint(class);

        do {
            uint pos = generateRandom() % len;
            uint value = (generateRandom() % (13 + len)) + 1;

            hero |= value << stats[pos];

            len--;
            stats[pos] = stats[len];
        } while (len > 0);

        // Insert created hero into the addressToHeroes mapping
        addressToHeroes[msg.sender].push(hero);
    }
}
