import { ethers } from "ethers";

/**
 * Get Metamask as Provider
 **/
function getEth() {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) {
    throw new Error("get metamask and a positive attitude");
  }
  return eth;
}

async function hasAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];

  return accounts && accounts.length;
}

async function requestAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];

  return accounts && accounts.length;
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("Please let me take your money");
  }

  const counter = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    // NOTE: Old ABI 01_HelloWorld.sol
    // ["function hello() public pure returns (string memory)"],
    // NOTE: New ABI 02_Counter.sol
    [
      "function count() public",
      "function getCounter() public view returns (uint32)",
    ],
    new ethers.providers.Web3Provider(getEth())
  );

  // NOTE: New for 02_Counter
  const el = document.createElement("div");
  async function setCounter() {
    el.innerHTML = await counter.getCounter();
  }
  setCounter();

  const button = document.createElement("button");
  button.innerText = "increment";
  button.onclick = async function() {
    await counter.count();
    setCounter();
  };

  document.body.appendChild(el);
  document.body.appendChild(button);

  // NOTE: Old for 01_HelloWorld
  // document.body.innerHTML = await counter.hello();
}

run();

// TODO: Use Complete Code
// import { ethers } from "ethers";
//
// async function hasSigners(): Promise<boolean> {
//     //@ts-ignore
//     const metamask = window.ethereum;
//     const signers = await (metamask.request({method: 'eth_accounts'}) as Promise<string[]>);
//     return signers.length > 0;
// }
//
// async function requestAccess(): Promise<boolean> {
//     //@ts-ignore
//     const result = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
//     return result && result.length > 0;
// }
//
// async function getContract() {
//     const address = process.env.CONTRACT_ADDRESS;
//
//     if (!(await hasSigners()) && !(await requestAccess())) {
//         console.log("You are in trouble, no one wants to play");
//     }
//
//     // @ts-ignore
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const contract = new ethers.Contract(
//         address,
//         [
//             "function hello() public pure returns(string memory)",
//         ], // abi
//         provider
//     );
//
//     console.log("We have done it, time to call");
//     console.log(await contract.hello());
// }
//
//
// getContract();
