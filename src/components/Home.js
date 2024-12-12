import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletContext } from '../contexts/WalletContext';

const Home = () => {
  const { walletAddress, isRegistrar, connectWallet } = useWalletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (walletAddress) {
      if (isRegistrar) {
        navigate('/registrar-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [walletAddress, isRegistrar, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-800 via-gray-900 to-black text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Welcome to MedBadge
      </h1>
      <p className="text-lg mb-8 text-gray-300 text-center max-w-md">
        Secure and verify your vaccination records with MedBadge. Connect your wallet to get started.
      </p>
      {!walletAddress && (
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Home;
