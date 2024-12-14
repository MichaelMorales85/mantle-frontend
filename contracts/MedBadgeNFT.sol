// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//simplify the contract for mantle test network, which not support some previous function
contract MedBadgeNFT is ERC721Enumerable, Ownable {
    uint256 private _nextTokenId; // Counter for token IDs
    mapping(uint256 => string) private _tokenURIs; // Mapping for token URIs

    constructor() ERC721("MedBadge", "MBG") Ownable(msg.sender) {}

    /**
     * @notice Issue a new NFT to a specified address with a metadata URI.
     * @param to The address to receive the NFT.
     * @param metadataURI The URI of the metadata for the NFT.
     */
    function issue(address to, string memory metadataURI) external onlyOwner {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = metadataURI;
    }

    /**
     * @notice Returns an array of token IDs and their corresponding URIs owned by the caller.
     * @return tokenIds Array of token IDs owned by the caller.
     * @return tokenURIs Array of metadata URIs for the tokens.
     */
    function getMyNFTs()
        external
        view
        returns (uint256[] memory tokenIds, string[] memory tokenURIs)
    {
        uint256 balance = balanceOf(msg.sender);

        // Initialize arrays for token IDs and URIs
        tokenIds = new uint256[](balance);
        tokenURIs = new string[](balance);

        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
            tokenIds[i] = tokenId;
            tokenURIs[i] = _tokenURIs[tokenId];
        }

        return (tokenIds, tokenURIs);
    }

    /**
     * @notice Override tokenURI to return metadata URI stored in `_tokenURIs`.
     * @param tokenId The token ID to retrieve the metadata URI for.
     * @return The metadata URI of the token.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
