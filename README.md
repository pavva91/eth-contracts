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

### Gas Reporter

- yarn add -D hardhat-gas-reporter

import this line to your hardhat.config.ts:

- import "hardhat-gas-reporter"

## Code Formatting (prettier plugin)

- yarn add -D prettier prettier-plugin-solidity

Run code formatter:

```bash
npx prettier --write 'contracts/**/*.sol'
```

if null-ls is well configured it will work (add filetype to prettier):

```lua
require("null-ls").builtins.formatting.prettier.with({
    filetypes = { "javascript", "javascriptreact", "typescript", "typescriptreact", "vue", "css", "scss", "less", "html", "json", "jsonc", "yaml", "markdown", "markdown.mdx", "graphql", "handlebars", "solidity" },
}),
```

## Contract Size

Hard limit is 24KB
How to calculate the size in Bytes of the contract:

```shell
$(($(cat artifacts/contracts/04_Hero.sol/Hero.json | jq .deployedBytecode | wc -c) / 2 - 1))
```

## Diamond Contract

Always throw a contract behind a diamond, you always have a way to update it.
Scripts from 06 to 11 are on the actual implementation of A smart contract into a diamond (with storage)
The contracts 10, 11, 12 represent the A smart contract as Diamond (no storage, with storage, add increment function)
These contracts and scripts run on the diamond repo:

- [https://github.com/mudgen/diamond-3-hardhat](https://github.com/mudgen/diamond-3-hardhat)

Sources:

- [https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard)

### Diamond Workflow

First (and only): Deploy (once)

- Deploy contract as a diamond: npx hardhat run scripts/06-deploy-A-diamond.js --network localhost

Run a contract function:

- Get: npx hardhat run scripts/07-call-getA-diamond.js --network localhost
- Set: npx hardhat run scripts/10-call-setA-diamond.js --network localhost

Update the Smart Contract (Replace the diamond):

- Replace: npx hardhat run scripts/08-replace-A-diamond.js --network localhost

Run the newly added function:

- Increment: npx hardhat run scripts/10-call-setA-diamond.js --network localhost

Check if increment worked:

- Get: npx hardhat run scripts/07-call-getA-diamond.js --network localhost
