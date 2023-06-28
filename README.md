# Ethereum Smart Contract Development

## Getting Started Steps for initializing hardhat project (Use node LTS)

- mkdir jpegdegens
- cd jpegdegens
- node -v
- nvm install --lts
- nvm use --lts
- git init
- yarn init -y
- yarn add -D hardhat
- npx hardhat
  - create empty hardhat.config.js
- mkdir contracts
- mkdir scripts

## Dependencies
### Tests
- yarn add -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

### Typescript
- yarn add -D ts-node typescript

### Testing Types
- yarn add -D chai @types/node @types/mocha @types/chai

### Webpack
- yarn add -D webpack webpack-cli ts-loader html-webpack-plugin dotenv
