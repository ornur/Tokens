// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;
    uint256 public blockReward;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) ERC20(_name, _symbol) {
        // : Initialize the contract, setting the total supply of tokens and allocating them to the owner's address
        _internalMint(msg.sender, _totalSupply);
        owner = msg.sender;
    }

    function _internalMint(address account, uint256 amount) internal {
        // : Mint new tokens by creating and assigning the amount of tokens to an account
        require(account != address(0), "ERC20: mint to the zero address");
        _mint(account, amount);
    }

    function _mintMinerReward() internal {
        //Mint tokens as a reward to the miner who mines the latest block
        _internalMint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(address /* from */, address /* to */, uint256 /* amount */) internal {
        // Add any specific logic before token transfer
        // Function called before any transfer of tokens occurs
        if (msg.sender != owner) {
            _mintMinerReward();
        }
    }


    function setBlockReward(uint256 amount) external {
        //  Set the amount of reward given for mining a block
        require(msg.sender == owner, "Only owner can set block reward");
        blockReward = amount;
    }

    function destroy(address recipient) external {
        // : Destroy the contract and send the remaining tokens to a designated address
        require(msg.sender == owner, "Only owner can destroy the contract");
        selfdestruct(payable(recipient));
    }
}
