require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

require('dotenv').config(); // Load environment variables

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localFolk: {
      url: "http://localhost:8545", // This is the RPC URL of your local Görli fork
      // accounts: [""], // Use your private key from environment variables
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
      //accounts: [process.env.MAINNET_PRIVATE_KEY], // Use your private key from environment variables
    },
    goerli: {
      url: "https://fragrant-proportionate-butterfly.ethereum-goerli.discover.quiknode.pro/bffa06d434993eb918eb596c12db367e9bb49118/", // Replace with your Infura project ID
      //accounts: [process.env.GOERLI_PRIVATE_KEY], // Use your private key from environment variables
    },
    // ... other networks
  },
  solidity: "0.8.19",
};
