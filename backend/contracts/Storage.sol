// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public currentTokenId;

    string public baseTokenURI;

    // Constructor
    constructor() ERC721("PING20", "NFT") Ownable(msg.sender) {
        baseTokenURI = "";
    }

    // Mint a new NFT
    function mintNFT() public returns (uint256) {
        currentTokenId.increment(); // Increment token ID counter
        uint256 newItemId = currentTokenId.current();
        _safeMint(msg.sender, newItemId); // Mint the new NFT
        return newItemId;
    }

    // Override the baseURI function
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    // Set the base URI for all NFTs
    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
}
