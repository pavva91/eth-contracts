import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const fallback = await ethers.deployContract("Fallback");

  console.log(fallback.address);

  return fallback;
}

async function fallback(fallback) {
  const f = await ethers.getContractAt("IFallback", fallback.address);
  await f.count();
}

deploy().then(fallback);
