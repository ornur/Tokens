let chai;
import("chai").then((module) => {
  chai = module;
});
const { expect } = chai;
const { ethers } = require("hardhat");

describe("MyToken", function() {
  let MyToken, myToken, owner, newOwner, recipient;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, newOwner, recipient, ...others] = await ethers.getSigners();
    myToken = await MyToken.deploy("MyToken", "MTK", 10000, owner.address);

    await myToken.deployed();
  });

  it("should set the correct owner", async function() {
    expect(await myToken.owner()).to.equal(owner.address);
  });

  it("should set block reward correctly", async function() {
    await myToken.connect(owner).setBlockReward(100);
    expect(await myToken.blockReward()).to.equal(100);
  });

  it("should mint tokens correctly", async function() {
    await myToken.connect(owner).mint(recipient.address, 500);
    expect(await myToken.balanceOf(recipient.address)).to.equal(500);
  });

  it("should change owner correctly", async function() {
    await myToken.connect(owner).changeOwner(newOwner.address);
    expect(await myToken.owner()).to.equal(newOwner.address);
  });
});