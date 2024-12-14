import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../contracts/contractConfig";
import { useWalletContext } from "../contexts/WalletContext";

// Reusable NFTCard Component for displaying a single NFT
const NFTCard = ({ nft }) => {
    return (
        <div className="bg-blue-500 border border-blue-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={nft.image || "https://via.placeholder.com/300"} // Fallback image if no URL is provided
                    alt={nft.name || "NFT"}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* NFT Info Section */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-2 truncate">
                    {nft.name || "Untitled NFT"}
                </h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {nft.description || "No description available."}
                </p>

                {/* Attributes Section */}
                <div className="text-sm text-gray-200 space-y-1 flex-grow">
                    {nft.attributes && nft.attributes.length > 0 ? (
                        nft.attributes.map((attr, index) => (
                            <div key={index} className="flex items-start gap-2 break-words">
                                <span className="font-semibold text-gray-100">
                                    {attr.trait_type || "Attribute"}:
                                </span>
                                <span>{attr.value || "N/A"}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No attributes available.</p>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <div className="bg-blue-600 p-3 text-center">
                <button className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                    View Details
                </button>
            </div>
        </div>
    );
};

const MyNFTs = () => {
    const { walletAddress } = useWalletContext(); // Get wallet address from Context
    const [nfts, setNFTs] = useState([]); // Store NFT data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch NFTs from the contract
    const fetchNFTs = async () => {
        if (!walletAddress) {
            setError("Please connect your wallet to view NFTs.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

            // Fetch NFT data from the contract
            const [tokenIds, tokenURIs] = await contract.getMyNFTs();

            // Parse NFT metadata
            const formattedNFTs = await Promise.all(
                tokenURIs.map(async (uri, index) => {
                    try {
                        const pinataURI = uri.replace(
                            "ipfs://",
                            "https://gateway.pinata.cloud/ipfs/"
                        );
                        const response = await fetch(pinataURI);
                        const metadata = await response.json();

                        return {
                            id: tokenIds[index].toString(), // Token ID
                            name: metadata.name,
                            description: metadata.description,
                            image: metadata.image.replace(
                                "ipfs://",
                                "https://gateway.pinata.cloud/ipfs/"
                            ),
                            attributes: metadata.attributes || [], // Attributes
                        };
                    } catch (err) {
                        console.error("Failed to parse NFT metadata:", err);
                        return null;
                    }
                })
            );

            // Filter out invalid NFTs
            setNFTs(formattedNFTs.filter((nft) => nft !== null));
        } catch (err) {
            console.error("Failed to fetch NFTs:", err);
            setError("Failed to load your NFTs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, [walletAddress]);

    return (
        <div className="min-h-screen bg-blue-600 text-white p-8">
            <h2 className="text-4xl font-bold text-center mb-10 text-white">
                My NFT Collection
            </h2>

            {/* Loading State */}
            {loading && <p className="text-center">Loading your NFTs...</p>}

            {/* Error State */}
            {error && <p className="text-red-400 text-center">{error}</p>}

            {/* NFT List */}
            {!loading && nfts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {nfts.map((nft) => (
                        <NFTCard key={nft.id} nft={nft} />
                    ))}
                </div>
            )}

            {/* No NFTs */}
            {!loading && nfts.length === 0 && !error && (
                <p className="text-center text-gray-200">You don't own any NFTs.</p>
            )}
        </div>
    );
};

export default MyNFTs;
