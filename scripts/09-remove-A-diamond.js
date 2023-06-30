const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

// NOTE: Change 1 with replace script
async function deleteA(diamondAddress) {
  const cut = []
  const Facet = await ethers.getContractFactory("A")
  const facet = await Facet.deploy()
  await facet.deployed()
  console.log(`A deployed: ${facet.address}`)

  // NOTE: This is the cut that is required to add to our diamond
  cut.push({
    // NOTE: Change 2 with replace script
    facetAddress: "0x0000000000000000000000000000000000000000",
    // NOTE: Change 3 with replace script
    action: FacetCutAction.Remove,
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

const diamondAddr = "0xD5ac451B0c50B9476107823Af206eD814a2e2580"

deleteA(diamondAddr)

