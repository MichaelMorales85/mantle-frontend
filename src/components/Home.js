import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ walletAddress, connectWallet, isRegistrar }) => {
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
