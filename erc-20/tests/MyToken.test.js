import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("MyToken", function () {
  let MyToken;
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
    addr1 = signers[1];
    addr2 = signers[2];
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy("Wetul", "WET", ethers.utils.parseEther("1000"));
    await myToken.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy with the correct name, symbol, and initial supply", async function () {
      expect(await myToken.name()).to.equal("Wetul");
      expect(await myToken.symbol()).to.equal("WET");
      expect(await myToken.totalSupply()).to.equal(ethers.utils.parseEther("1000"));
      expect(await myToken.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1000"));
    });
  });

  describe("Minting", function () {
    it("Should mint new tokens to the specified account", async function () {
      await myToken.connect(owner).mint(addr1.address, ethers.utils.parseEther("100"));
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should mint new tokens to multiple accounts", async function () {
      await myToken.connect(owner).mint(addr1.address, ethers.utils.parseEther("100"));
      await myToken.connect(owner).mint(addr2.address, ethers.utils.parseEther("200"));
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
      expect(await myToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("200"));
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      await myToken.connect(owner).transfer(addr1.address, ethers.utils.parseEther("100"));
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should not allow transfers if the sender does not have enough balance", async function () {
      await expect(myToken.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("100"))).to.be.revertedWith("ERC20: Insufficient balance");
    });

    it("Should update balances after transfers", async function () {
      await myToken.connect(owner).transfer(addr1.address, ethers.utils.parseEther("100"));
      expect(await myToken.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("900"));
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    });
  });

  describe("Burning", function () {
    it("Should burn tokens from the specified account", async function () {
      await myToken.connect(owner).burn(ethers.utils.parseEther("100"));
      expect(await myToken.totalSupply()).to.equal(ethers.utils.parseEther("900"));
    });

    it("Should not allow burning more tokens than the account balance", async function () {
      await expect(myToken.connect(owner).burn(ethers.utils.parseEther("2000"))).to.be.revertedWith("ERC20: Insufficient balance");
    });
  });

  describe("Block rewards", function () {
    it("Should reward the specified account with new tokens", async function () {
      await myToken.connect(owner).reward(addr1.address, ethers.utils.parseEther("100"));
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should not allow rewarding tokens to an account that is not the owner", async function () {
      await expect(myToken.connect(addr1).reward(addr2.address, ethers.utils.parseEther("100"))).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Contract destruction", function () {
    it("Should destroy the contract and send the remaining tokens to the specified account", async function () {
      await myToken.connect(owner).destroy(addr1.address);
      expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1000"));
    });

    it("Should not allow contract destruction if the caller is not the owner", async function () {
      await expect(myToken.connect(addr1).destroy(addr2.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  after(function () {
    console.log("Successfully tested");
  });
});
// Install chai-as-promised
// npm install --save-dev chai-as-promised

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const { expect } = chai;

// Replace all instances of `revertedWith` with `rejectedWith`

// Ensure that the `mint`, `burn`, and `reward` functions are implemented in your contract

// Ensure that the contract is not destroyed before calling the `balanceOf` function

// Ensure that the values you are setting in your contract are the same as the ones you are expecting in your tests