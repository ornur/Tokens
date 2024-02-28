// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HNFT is ERC721, Ownable {
    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    // Base URI for metadata
    string private _basURI;

    constructor(address initialOwner, string memory baseURI) ERC721("HNFT", "HNFT") Ownable(initialOwner) {
        _basURI = baseURI;
    }

    function _baseTokenURI() internal view virtual returns (string memory) {
        return _basURI;
    }

    function _tokenURI(uint256 tokenId) internal view virtual returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _uri = _tokenURIs[tokenId];
        string memory base = _baseTokenURI();

        if (bytes(base).length == 0) {
            return _uri;
        }
        if (bytes(_uri).length > 0) {
            return string(abi.encodePacked(base, _uri));
        }

        return super.tokenURI(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURI(tokenId);
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _basURI = baseURI;
    }

    function _setTokenURI(uint256 tokenId, string memory _uri) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _uri;
    }

    function mint(address to, uint256 tokenId, string memory uri) external onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _exists(tokenId);
    }

    function customSafeTransferFrom(address from, address to, uint256 tokenId) public {
        require(_msgSender() == ownerOf(tokenId) || isApprovedForAll(ownerOf(tokenId), _msgSender()), "HNFT: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, "");
    }


    function mySafeTransferFrom(address from, address to, uint256 tokenId) public {
        require(_msgSender() == ownerOf(tokenId) || isApprovedForAll(ownerOf(tokenId), _msgSender()), "HNFT: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, "");
    }

    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");
        require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()), "ERC721: approve caller is not owner nor approved for all");
        _approve(to, tokenId, msg.sender); // Adjusted call to _approve
    }

    function setApprovalForAll(address operator, bool approved) public override {
        require(operator != _msgSender(), "ERC721: approve to caller");
        _setApprovalForAll(_msgSender(), operator, approved);
    }
}
