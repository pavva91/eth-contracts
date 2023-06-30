// NOTE: This script update the new modified version of the diamond wihtout changing the contract address

// TODO: git clone https://github.com/mudgen/diamond-3-hardhat
// cd diamond-3-hardhat
// put this file inside scripts
// npx hardhat run scripts/08-replace-A-diamond.js --network localhost

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

// NOTE: Change 1 with deploy script
async function replaceA(diamondAddress) {
  const cut = []
  const Facet = await ethers.getContractFactory("A")
  const facet = await Facet.deploy()
  await facet.deployed()
  console.log(`A deployed: ${facet.address}`)

  // NOTE: This is the cut that is required to add to our diamond
  cut.push({
    facetAddress: facet.address,
    // NOTE: Change 2 with deploy script
    action: FacetCutAction.Replace,
    functionSelectors: getSelectors(facet)
  })
  // }
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddress)

  // tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
  tx = await diamondCut.diamondCut(cut, "0x0000000000000000000000000000000000000000", [])
  console.log('Diamond cut tx: ', tx.hash)
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')
  return diamondAddress
}

const diamondAddr = "0x525C7063E7C20997BaaE9bDa922159152D0e8417"

replaceA(diamondAddr)
