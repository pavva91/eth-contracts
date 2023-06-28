import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const hello = await foo();
  return hello;
}

async function foo() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy(); // is gonna build up a json request JSON-RPC to the network
  await hello.deployed();
  return hello;
}

async function sayHello(hello) {
  console.log("Say Hello: ", await hello.hello())
}

deploy().then(sayHello)
