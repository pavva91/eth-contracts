import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world", function() {
  it("should say hi", async function() {
    // 1. setup
    // 2. deploy out contract
    // 3. call our functions to test

    // 2.
    // FIX: Deprecated code (works with ethers 5.7.2)
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    // PERF: Newer version (one liner): works with ethers 5.7.2, don't work with ethers 6.6.1
    // const hello = await ethers.deployContract("HelloWorld");

    expect(await hello.hello()).to.equal("Hello, World");
  });
});
