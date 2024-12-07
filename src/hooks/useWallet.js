import { useState } from 'react';
import { ethers } from 'ethers';

// 登记员地址列表
const REGISTRARS = [
    '0x678F7fb42BcC819285EfE21fDA421E67B2F45839', // 替换为实际管理员地址
];

const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [isRegistrar, setIsRegistrar] = useState(false);

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
        } catch (error) {
            console.error(error);
        }
    };

    return { walletAddress, isRegistrar, connectWallet };
};

export default useWallet;
