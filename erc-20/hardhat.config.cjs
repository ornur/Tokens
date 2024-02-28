require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const { alchemyApiKey, mnemonic } = require('./secret.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.20",
    networks: {
        goerli: {
        url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
        accounts: { mnemonic: mnemonic }
        },
    },
};
