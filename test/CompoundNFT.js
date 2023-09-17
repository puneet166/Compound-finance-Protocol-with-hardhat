// Import the necessary dependencies
const { expect } = require('chai');
const { ethers } = require('hardhat');
const hre = require('hardhat'); // Importing Hardhat

describe('CompoundNFT', () => {
  let compoundNFT;
  let daiToken;
  let cT;
  let owner;
  let addr1;
  let addr2;
  let mintingPrice;

  beforeEach(async () => {
    try {
      // Impersonate an account for testing
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0x0bFD580a07a6f0F8ef8F9010D827d136c1ec6e43"],
      });

      // Get signers (accounts) for testing
      addr1 = await ethers.getSigner("0x0bFD580a07a6f0F8ef8F9010D827d136c1ec6e43"); // change your key which holding Dai and fund
      [owner, addr2] = await ethers.getSigners(); // Get multiple signers

      const CompoundNFT = await ethers.getContractFactory('CompoundNFT');
      mintingPrice = ethers.parseUnits("100", 18); // 100 DAI in wei , change accordingly.

      // For goreli testnet . These all address will ultilze in goreli testnet folk.

      compoundNFT = await CompoundNFT.deploy("0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC", "0x0545a8eaF7ff6bB6F708CbB544EA55DBc2ad7b2a");

      daiToken = await ethers.getContractAt("IERC20", "0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC");
      cDaiToken = await ethers.getContractAt("CErc20Interface", "0x0545a8eaF7ff6bB6F708CbB544EA55DBc2ad7b2a");
      cT = await ethers.getContractAt("CTokenInterface", "0x0545a8eaF7ff6bB6F708CbB544EA55DBc2ad7b2a");
    } catch (err) {
      console.error("Error in beforeEach:", err);
    }
  });

  describe('mintNFT', () => {
    it('should mint an NFT and deposit to Compound', async () => {
      // Minting process
      await daiToken.connect(addr1).approve(compoundNFT.target, mintingPrice);
      const tokenId = await compoundNFT.getCurrentTokenId();
      await compoundNFT.connect(addr1).mintNFT();

      // Check NFT details
      const userDetail = await compoundNFT.userDetails(tokenId);
      expect(await compoundNFT.balanceOf(addr1.address)).to.equal(1);
      expect(userDetail.investmentTime).to.not.equal(0);
      expect(userDetail.DepositDaiToken).to.equal(mintingPrice);
      expect(userDetail.recivedCToken).to.be.above(0);
    });

    it('should fail if user has insufficient DAI', async () => {
      // Trying to mint without sufficient DAI
      await expect(compoundNFT.connect(addr1).mintNFT()).to.be.revertedWith('Insufficient allowance');
    });
  });

  describe('burnNFT', () => {
    it('should burn NFT, withdraw from Compound, and return DAI', async () => {
      // Mint NFT and deposit to Compound
      await daiToken.connect(addr1).approve(compoundNFT.target, mintingPrice);
      let tokenId = await compoundNFT.getCurrentTokenId();
      await compoundNFT.connect(addr1).mintNFT();

      // Burning process
      await compoundNFT.connect(addr1).burnNFT(tokenId);
      const userDetail = await compoundNFT.userDetails(tokenId);
      expect(userDetail.DepositDaiToken).to.equal(0);

      expect(await compoundNFT.balanceOf(addr1.address)).to.equal(0);
    });

    it('should fail if user is not the owner of the NFT', async () => {
      // Mint NFT and deposit to Compound
      await daiToken.connect(addr1).approve(compoundNFT.target, mintingPrice);
      let tokenId = await compoundNFT.getCurrentTokenId();
      await compoundNFT.connect(addr1).mintNFT();

      // Trying to burn with different address
      await expect(compoundNFT.connect(addr2).burnNFT(tokenId)).to.be.revertedWith('Not the owner');
    });
  });

  describe('withdrawInterestIncTOKEN', () => {
    it('should withdraw accrued interest in cTokens', async () => {
      // Mint NFT and deposit to Compound
      await daiToken.connect(addr1).approve(compoundNFT.target, mintingPrice);
      let tokenId = await compoundNFT.getCurrentTokenId();
      await compoundNFT.connect(addr1).mintNFT();

      await compoundNFT.connect(addr1).burnNFT(tokenId);

      // Withdraw interest in cTokens
      await compoundNFT.connect(owner).withdrawInterestIncTOKEN();

      // Check cToken balance of owner
      const ownerCTokenBalance = await cT.balanceOf(owner.address);
      expect(ownerCTokenBalance).to.be.above(0);
    });

    it('should fail if interest balance is zero', async () => {
      // Trying to withdraw when interest balance is zero
      await expect(compoundNFT.connect(owner).withdrawInterestIncTOKEN()).to.be.revertedWith('insufficient interest accrued balance');
    });

    it('should fail if caller is not the owner', async () => {
      await expect(compoundNFT.connect(addr1).withdrawInterestIncTOKEN()).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('withdrawInterestInDai', () => {
    it('should withdraw accrued interest in DAI', async () => {
      // Mint NFT and deposit to Compound
      await daiToken.connect(addr1).approve(compoundNFT.target, mintingPrice);
      let tokenId = await compoundNFT.getCurrentTokenId();
      await compoundNFT.connect(addr1).mintNFT();
      await compoundNFT.connect(addr1).burnNFT(tokenId);

      // Withdraw interest in DAI
      await compoundNFT.connect(owner).withdrawInterestInDai();

      // Check DAI balance of owner
      const ownerDAIBalance = await daiToken.balanceOf(owner.address);
      expect(ownerDAIBalance).to.be.above(0);
    });

    it('should fail if interest balance is zero', async () => {
      // Trying to withdraw when interest balance is zero
      await expect(compoundNFT.connect(owner).withdrawInterestInDai()).to.be.revertedWith('insufficient interest accrued balance');
    });
  });

  describe('getCurrentTokenId', () => {
    it('should return current token id 0', async () => {

      //Get current Token id
      let tokenId = await compoundNFT.getCurrentTokenId();
      expect(tokenId).to.equal(0n);
    });

    it('should fail if token id is 1', async () => {
      let tokenId = await compoundNFT.getCurrentTokenId();
      expect(tokenId).to.not.equal(1n);
    });
  });
});
