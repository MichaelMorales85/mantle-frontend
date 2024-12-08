import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { REGISTRAR_ADDRESSES } from '../constants/generalconstant'; // Import the registrar addresses

// Create Context
const WalletContext = createContext();

// Provide Context Provider
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isRegistrar, setIsRegistrar] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not detected');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);

      // Check if the address is a registrar
      setIsRegistrar(REGISTRAR_ADDRESSES.includes(address.toLowerCase()));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, isRegistrar, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Create a Hook to Simplify Context Usage
export const useWalletContext = () => {
  return useContext(WalletContext);
};
