const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying MyToken with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(
        "Wetul", // Name
        "WET", // Symbol
        ethers.utils.parseEther("1000000"), // Total Supply (in wei)
        deployer.address // Owner
    );

    await myToken.deployed();

    console.log("MyToken deployed to:", myToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
