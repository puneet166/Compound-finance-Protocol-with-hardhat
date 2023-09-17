const { ethers, upgrades } = require("hardhat");

async function main() {
  // Retrieve the contract factory for "CompoundNFT"
  const CompoundNFT = await ethers.getContractFactory("CompoundNFT");

  // Replace these addresses with the actual addresses
  const daiTokenAddress = "0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC"; // Dai address for goreli testnet. change accordingly for mainnet
  const cDaiTokenAddress = "0x0545a8eaF7ff6bB6F708CbB544EA55DBc2ad7b2a"; // CDai address for goreli testnet. change accordingly for mainnet

  // Deploy the CompoundNFT contract with the specified addresses
  const compoundNFT = await CompoundNFT.deploy(daiTokenAddress, cDaiTokenAddress);

  // Log the address where the CompoundNFT contract is deployed
  console.log("CompoundNFT deployed to:", compoundNFT.target);
}

// Execute the main function
main()
  .then(() => process.exit(0)) // If successful, exit with code 0
  .catch(error => {
    console.error(error);
    process.exit(1); // If there's an error, exit with code 1
  });
