import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy(name, ...args) {
  const Fallback = await ethers.getContractFactory(name);
  const fallback = await Fallback.deploy(...args);
  await fallback.deployed();

  console.log(fallback.address);

  return fallback;
}

// NOTE: Print contract storage slots
async function printStorage(contract, name, count) {
  for (let i = 0; i < count; i++) {
    console.log(
      name,
      i,
      await ethers.provider.getStorageAt(contract.address, i)
    );
  }
}

async function fallback() {
  const a = await deploy("AS");
  const b = await deploy("BS", a.address);

  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("----------");

  await a.setA(42);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("----------");

  await b.setB(60);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("----------");

  await printStorage(b, "B", 3);
  await b.setB(0x45);

  console.log("----------");
  await printStorage(b, "B", 3);
}

fallback();
