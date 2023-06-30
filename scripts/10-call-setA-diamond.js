async function callSetA() {
  const diamondAddr = "0x3155755b79aA083bd953911C92705B7aA82a18F9"
  const a = await ethers.getContractAt("IA", diamondAddr);
  console.log("a", await a.setA(32));
}

callSetA();
