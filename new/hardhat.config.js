require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");

module.exports = {
  solidity: "0.8.20", // Specify the Solidity version
  networks: {
    // Define your network configurations here
    // For example, you can configure the localhost network for development
    localhost: {
      url: "http://127.0.0.1:8545", // URL of your local Ethereum node
    },
    // You can define additional networks for testnets or mainnet as needed
    // Example configuration for Rinkeby test network
    sepolia: {
      url: `https://sepolia.infura.io/v3/57f36c932e74400b9b805437c277b607`, // Replace with your Infura project ID
      accounts: [`ff92f66a484acd49d89559d22339b03c42fd9ec396b0d33373353ff67167c326`], // Replace with your account's private key
    },
  },
  external: {
    contracts: [
      // Define external contracts to be imported during compilation
      {
        artifacts: "@openzeppelin/contracts/token/ERC20/ERC20.sol",
      },
    ],
  },
  mocha: {
    timeout: 20000 // Adjust timeout as needed
  },
};
