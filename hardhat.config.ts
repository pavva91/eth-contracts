require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
import "hardhat-gas-reporter";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.SEPOLIA_SECRET_KEY_ACCOUNT}`],
    },
  },
};
