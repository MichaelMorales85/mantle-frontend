import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ethers } from 'ethers';

const Home = ({ walletAddress, isRegistrar, setIsRegistrar, setWalletAddress }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`isRegistrar in Home: ${isRegistrar}`);
        if (walletAddress) {
            if (isRegistrar) {
                navigate('/registrar-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        }
    }, [walletAddress, isRegistrar, navigate]);


    const REGISTRARS = [
        '0x678F7fb42BcC819285EfE21fDA421E67B2F45839test'.trim().toLowerCase(), , // 替换为实际管理员地址
    ];

    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error('未检测到 MetaMask');

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);

            // 判断是否为登记员
            const isRegistrarAddress = REGISTRARS.includes(address.toLowerCase());
            setIsRegistrar(isRegistrarAddress);
            console.log(`address.toLowerCase() ： ${address.toLowerCase()}`)
            console.log(`isRegistrarAddress in  useWallet: ${isRegistrarAddress}`)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-black text-white">
            <h1 className="text-4xl font-bold mb-4">欢迎来到 MedBadge</h1>
            {!walletAddress && (
                <button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
                    onClick={connectWallet}
                >
                    连接钱包
                </button>
            )}
        </div>
    );
};

export default Home;
