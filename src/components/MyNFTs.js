import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../contracts/contractConfig";
import { useWalletContext } from "../contexts/WalletContext";

const MyNFTs = () => {
    const { walletAddress } = useWalletContext(); // Get wallet address from Context
    const [nfts, setNFTs] = useState([]); // Store NFT data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

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

            // Call contract method to fetch NFT data
            const [tokenIds, tokenURIs] = await contract.getMyNFTs();

            // Parse NFT metadata
            const formattedNFTs = await Promise.all(
                tokenURIs.map(async (uri, index) => {
                    try {
                        // Replace IPFS URL format with Pinata gateway
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

            // Filter out any failed NFTs
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white p-8">
            <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400">
                My NFT Collection
            </h2>

            {/* Loading State */}
            {loading && <p className="text-center">Loading your NFTs...</p>}

            {/* Error State */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* NFT List */}
            {!loading && nfts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {nfts.map((nft) => (
                        <div
                            key={nft.id}
                            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            {/* Image Section */}
                            <div className="relative group">
                                <img
                                    src={nft.image}
                                    alt={nft.name}
                                    className="rounded-t-lg w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gradient bg-clip-text from-blue-400 to-purple-500 mb-2">
                                    {nft.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                    {nft.description}
                                </p>
                                <div className="text-sm text-gray-300 space-y-1">
                                    {nft.attributes.map((attr, index) => (
                                        <p key={index} className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-200">
                                                {attr.trait_type}:
                                            </span>
                                            <span>{attr.value}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No NFTs */}
            {!loading && nfts.length === 0 && !error && (
                <p className="text-center text-gray-400">You don't own any NFTs.</p>
            )}
        </div>
    );
};

export default MyNFTs;
