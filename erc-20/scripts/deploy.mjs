const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const MyToken = await ethers.getContractFactory("MyToken");

  // Deploy the contract
  const token = await MyToken.deploy("Wetul", "WET", ethers.utils.parseEther("1000"));
  await token.deployed();

  console.log("ERC-20 token contract deployed at:", token.address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
