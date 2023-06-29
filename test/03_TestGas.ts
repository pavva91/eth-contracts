import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Test Gas Consumption of opcodes", function() {
  it("Test Add operation increasing", async function() {
    // 1. setup
    // 2. deploy out contract
    // 3. call our functions to test

    // 2.
    const Gas = await ethers.getContractFactory("TestGas");
    const gas = await Gas.deploy();
    await gas.deployed();

    for (let i = 0; i < 10; i++) {
      await gas.test1();
      await gas.test2();
      await gas.test3();
    }
  });

  it("Test function operation", async () => {
    const gas = await ethers.deployContract("TestGas");
    for (let i = 0; i < 10; i++) {
      await gas.test4();
      await gas.test5();
    }
  });
});
