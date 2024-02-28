const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HNFT", function () {
  let HNFT;
  let nft;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    NFT = await ethers.getContractFactory("HNFT");
    nft = await NFT.deploy("HateNFT", "HNFT", "https://metadata-api.com/");
    await nft.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy with the correct name, symbol, and base URI", async function () {
      expect(await nft.name()).to.equal("HateNFT");
      expect(await nft.symbol()).to.equal("HNFT");
      expect(await nft.baseURI()).to.equal("https://metadata-api.com/");
    });
  });

  describe("Minting", function () {
    it("Should mint new tokens to the specified account with correct metadata URI", async function () {
      const tokenId = 1;
      const tokenURI = "https://metadata-api.com/token/1";
      await nft.connect(owner).mint(addr1.address, tokenId, tokenURI);
      expect(await nft.ownerOf(tokenId)).to.equal(addr1.address);
      expect(await nft.tokenURI(tokenId)).to.equal(tokenURI);
    });
  });

  describe("Base URI", function () {
    it("Should allow the owner to set the base URI", async function () {
      const newBaseURI = "https://new-metadata-api.com/";
      await nft.connect(owner).setBaseURI(newBaseURI);
      expect(await nft.baseURI()).to.equal(newBaseURI);
    });
  });
});
