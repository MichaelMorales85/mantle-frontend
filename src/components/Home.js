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
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-blue-600 text-white"
    >
      {/* Left Background Image */}
      <img
        src="/home-left.png"
        alt="Doctor assisting family"
        className="absolute left-5 top-20 w-1/2 max-w-lg transform translate-x-16 scale-125 opacity-45 shadow-2xl hover:scale-130 hover:translate-y-2 transition-transform duration-300"
      />


      {/* Right Background Image */}
      <img
        src="/home-right.png"
        alt="Doctor dashboard"
        className="absolute right-5 top-20 w-1/2 max-w-lg transform -translate-x-16 scale-125 opacity-45 shadow-2xl hover:scale-130 hover:translate-y-2 transition-transform duration-300"
      />


      {/* Main Content */}
      <div className="relative z-10 text-center scale-110">
        <h1 className="text-6xl font-extrabold mb-10">
          Welcome to MedBadge
        </h1>
        <p className="text-2xl mb-12 text-gray-100 max-w-xl mx-auto">
          Secure and verify your vaccination records with MedBadge. Connect your wallet to get started.
        </p>
        {!walletAddress && (
          <button
            className="px-12 py-5 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-110"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>

    </div>
  );
};

export default Home;
