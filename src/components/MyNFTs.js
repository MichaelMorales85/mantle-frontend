import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '../contracts/contractConfig';
import { useWalletContext } from '../contexts/WalletContext';
import { nftList } from '../data/nftData';

const MyNFTs = () => {
    const { walletAddress } = useWalletContext(); // 从 Context 获取钱包地址
    const [nfts, setNFTs] = useState([]); // 存储 NFT 数据
    const [loading, setLoading] = useState(false); // 加载状态
    const [error, setError] = useState(null); // 错误信息

    const fetchNFTs = async () => {
        if (!walletAddress) {
            setError('请先连接钱包以查看您的 NFT。');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

            // // 调用合约方法获取用户的 NFT 数据
            // const userNFTs = await contract.getUserNFTs(walletAddress);

            // // 格式化返回的数据
            // const formattedNFTs = userNFTs.map((nft, index) => ({
            //     id: index + 1, // 假设按顺序分配 ID
            //     metadata: nft, // NFT 元数据
            // }));

            setNFTs(nftList);
        } catch (err) {
            console.error('获取 NFT 失败:', err);
            setError('无法加载您的 NFT，请稍后重试。');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, [walletAddress]);

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg">
            <h2 className="text-2xl mb-4">我的 NFT</h2>

            {/* 加载状态 */}
            {loading && <p>正在加载您的 NFT...</p>}

            {/* 错误提示 */}
            {error && <p className="text-red-500">{error}</p>}

            {/* 显示 NFT 列表 */}
            {!loading && nfts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nfts.map((nft) => (
                        <div
                            key={nft.id}
                            className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={nft.image}
                                alt={nft.name}
                                className="rounded-md mb-4 w-full"
                            />
                            <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                            <p className="text-sm mb-4">{nft.description}</p>
                            <div className="text-sm text-gray-400 mb-4">
                                {nft.attributes.map((attr, index) => (
                                    <p key={index}>
                                        <strong>{attr.trait_type}: </strong>
                                        {attr.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 如果没有 NFT */}
            {!loading && nfts.length === 0 && !error && <p>您还没有任何 NFT。</p>}
        </div>
    );
};

export default MyNFTs;
