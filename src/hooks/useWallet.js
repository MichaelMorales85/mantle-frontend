import { useState } from 'react';
import { ethers } from 'ethers';

// 定义常量，用于验证是否是管理员
const REGISTRARS = [
    '0x678F7fb42BcC819285EfE21fDA421E67B2F45839', // 替换为实际管理员地址
];

const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [isRegistrar, setIsRegistrar] = useState(false);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error('未检测到 MetaMask');

            // 创建 Web3 Provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []); // 请求钱包连接

            const signer = provider.getSigner();
            const address = await signer.getAddress(); // 获取钱包地址
            setWalletAddress(address);

            // 检查地址是否在管理员列表中
            const isRegistrarAddress = REGISTRARS.includes(address.toLowerCase());
            setIsRegistrar(isRegistrarAddress);
        } catch (error) {
            console.error(error);
        }
    };

    return { walletAddress, isRegistrar, connectWallet };
};

export default useWallet;
