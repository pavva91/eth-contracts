async function callIncrementA() {
  const diamondAddr = "0x525C7063E7C20997BaaE9bDa922159152D0e8417"
  const a = await ethers.getContractAt("IA", diamondAddr);
  console.log("a", await a.incrementA());
}

callIncrementA();

