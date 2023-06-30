// NOTE: this works here
// npx hardhat run scripts/07-callA-diamond.js --network localhost

async function callA() {
  const diamondAddr = "0x4631BCAbD6dF18D94796344963cB60d44a4136b6"
  const a = await ethers.getContractAt("IA", diamondAddr);
  console.log("a", await a.getA());
}

callA();

