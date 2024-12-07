import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '../contracts/contractConfig';

const UserDashboard = () => {
  const [nfts, setNfts] = useState([]);

  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const userNFTs = await contract.getUserNFTs(await signer.getAddress());
      setNfts(userNFTs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl mb-4">你的 NFT</h2>
      <ul>
        {nfts.map((nft, index) => (
          <li key={index} className="mb-2">
            {JSON.stringify(nft)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
