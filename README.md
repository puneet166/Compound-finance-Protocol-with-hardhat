# NFT Miniting and Compound finance integration

## How Smart Contract Works

Before invoking the `mint` function of smart contract , ensure that your contract has an allowance to spend DAI on your behalf. Otherwise, it will result in an allowance error.

The code is structured in a way and it follows best practices and is thoroughly commented to facilitate easy understanding.

## Running Test Cases

Before proceeding, make sure you have the following installed:

- Node version: 16.20.0
- Hardhat

Follow these steps:

1. Clone the project.
2. Run `npm i`.
3. Fork the Goerli testnet. (Test cases are written according to this testnet and have been thoroughly tested on Goerli.) If you'd like to switch to the mainnet, read the comments within the testing code file and adjust the addresses of Dai and CDai tokens accordingly.
4. To fork the Goerli testnet, run the command:

``` npx hardhat node --fork https://goerli.infura.io/v3/20f4e4de34cf4272b76fe44eafb89b84 ```

5. Once you have forked the Goerli testnet, it will be available at `http://localhost:8545`.
6. Run the following command to execute the test cases:

``` npx hardhat test --network localFork ```

## Deploying the Smart Contract on localhost:8545

To deploy the smart contract on the forked localhost, follow these steps:

1. Run the command:
``` npx hardhat run --network localFork scripts/deploy.js ```

## Deploying the Smart Contract on Goerli testnet 

1. Run the command:

``` npx hardhat run --network goerli scripts/deploy.js ```

## Deploying the Smart Contract on Mainnet (before deploy smart contract on mainnet First change the rpc url of mainnet in hardhat.config.js file  

1. Run the command:

``` npx hardhat run --network mainnet scripts/deploy.js ```

---

## NOTE - You also run this smart contract on remix.ide . 

contract location - contracts/CompoundNFT . 

This smart contract well tested on goreli testnet . i am sharing some Tx hash so you can take a look - 

1. https://goerli.etherscan.io/tx/0x4088013ca3f226e3f8b244a5efe3ec38c5d45dcfeaa77792c3a27bd8496f1983
2. https://goerli.etherscan.io/tx/0xd9b4eca742b3d1b546f36c167de33e0c5cc9941015e3d84d0b615ab34c676e4d
3. https://goerli.etherscan.io/tx/0x548e3a3a7c9988118a289a000680707332533c7fdb647577a4628223d588c82a
4. https://goerli.etherscan.io/tx/0x220a5228abb88abbe4a8e96a98095d683634da2c290288c1600ad26539ff2140
5. https://goerli.etherscan.io/tx/0x5751c89a373c2d307bb97adf3b9943182aa162cc522e9f577e7c50cde60d1f09
6. https://goerli.etherscan.io/tx/0xdc10ca3da2e532a8444202a3ece04d9f155c84861c8637712382bb5b69e3151d
7. https://goerli.etherscan.io/tx/0xbf333978053a6df8b182a5706fd7d35d557f46292103f065600496e9ea12b84a
