// TODO: git clone https://github.com/mudgen/diamond-3-hardhat
// cd diamond-3-hardhat
// put this file inside contracts

/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deployDiamond() {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
  const diamondCutFacet = await DiamondCutFacet.deploy()
  await diamondCutFacet.deployed()
  console.log('DiamondCutFacet deployed:', diamondCutFacet.address)

  // NOTE: Here you add your smartcontract
  // deploy Diamond
  const Diamond = await ethers.getContractFactory('Diamond')
  const diamond = await Diamond.deploy(contractOwner.address, diamondCutFacet.address)
  await diamond.deployed()
  console.log('Diamond deployed:', diamond.address)

  return diamond;
}
// deploy DiamondInit
// DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
// Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
// const DiamondInit = await ethers.getContractFactory('DiamondInit')
// const diamondInit = await DiamondInit.deploy()
// await diamondInit.deployed()
// console.log('DiamondInit deployed:', diamondInit.address)

// deploy facets
// console.log('')
// console.log('Deploying facets')
// const FacetNames = [
//   'DiamondLoupeFacet',
//   'OwnershipFacet'
// ]

async function addA(diamond) {
  const cut = []
  // for (const FacetName of FacetNames) {
  // const Facet = await ethers.getContractFactory(FacetName)
  const Facet = await ethers.getContractFactory("A")
  const facet = await Facet.deploy()
  await facet.deployed()
  console.log(`A deployed: ${facet.address}`)

  // NOTE: This is the cut that is required to add to our diamond
  cut.push({
    facetAddress: facet.address,
    action: FacetCutAction.Add,
    functionSelectors: getSelectors(facet)
  })
  // }
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)

  // tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
  tx = await diamondCut.diamondCut(cut, "0x0000000000000000000000000000000000000000", [])
  console.log('Diamond cut tx: ', tx.hash)
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')
  return diamond.address
}

// upgrade diamond with facets
// console.log('')
// console.log('Diamond Cut:', cut)
// const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
// let tx
// let receipt
// call to init function
// let functionCall = diamondInit.interface.encodeFunctionData('init')
// tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
// console.log('Diamond cut tx: ', tx.hash)
// receipt = await tx.wait()
// if (!receipt.status) {
//   throw Error(`Diamond upgrade failed: ${tx.hash}`)
// }
// console.log('Completed diamond cut')
// return diamond.address
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// if (require.main === module) {
//   deployDiamond()
//     .then(() => process.exit(0))
//     .catch(error => {
//       console.error(error)
//       process.exit(1)
//     })
// }

if (require.main === module) {
  deployDiamond()
    .then(addA)
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond


