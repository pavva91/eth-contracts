import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter"); // Read the contract from file
  const counter = await Counter.deploy(); // Deploy the contract
  await counter.deployed(); // Wait until the contract is deployed

  return counter;
}

async function count(counter) {
  await counter.count()
  console.log("Counter", await counter.getCounter() );
}

deploy().then(count);
