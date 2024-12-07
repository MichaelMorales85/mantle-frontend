import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

// 创建 Context
const WalletContext = createContext();

// 提供 Context 的 Provider
export const WalletProvider = ({ children }) => {
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
      setIsRegistrar(
        address.toLowerCase() === '0x678f7fb42bcc819285efe21fda421e67b2f45839' // 示例地址
      );
    } catch (error) {
      console.error('连接钱包失败:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, isRegistrar, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// 创建一个 Hook 简化使用 Context
export const useWalletContext = () => {
  return useContext(WalletContext);
};
