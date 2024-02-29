// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address private _owner;
    uint256 private _blockReward;

    event BlockRewardSet(uint256 amount);
    event OwnerChanged(address newOwner);

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner
    ) ERC20(name, symbol) {
        _owner = owner;
        _mint(owner, totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Ownable: caller is not the owner");
        _;
    }

    function setBlockReward(uint256 amount) external onlyOwner {
        _blockReward = amount;
        emit BlockRewardSet(amount);
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function mintMinerReward() external onlyOwner {
        _mint(_owner, _blockReward);
    }

    function withdrawEther(address payable recipient) external onlyOwner {
        require(address(this).balance > 0, "No ether to withdraw");
        recipient.transfer(address(this).balance);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        return transferLogic(recipient, amount);
    }

    function transferLogic(
        address recipient,
        uint256 amount
    ) internal returns (bool) {
        uint256 fee = amount / 100;
        uint256 amountAfterFee = amount - fee;

        _transfer(_msgSender(), address(this), fee);
        _transfer(_msgSender(), recipient, amountAfterFee);

        return true;
    }

    function changeOwner(address newOwner) external onlyOwner {
        _owner = newOwner;
        emit OwnerChanged(newOwner);
    }
}