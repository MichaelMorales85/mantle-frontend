import React, { useState } from 'react';
import MyNFTs from './MyNFTs';
import VaccineReservation from './VaccineReservation';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('myNFTs');

  return (
    <div className="p-4 bg-gray-800 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">用户仪表盘</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg ${activeTab === 'myNFTs' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          onClick={() => setActiveTab('myNFTs')}
        >
          我的 NFT
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${activeTab === 'reserveVaccine' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          onClick={() => setActiveTab('reserveVaccine')}
        >
          预约疫苗
        </button>
      </div>

      {activeTab === 'myNFTs' && <MyNFTs />}
      {activeTab === 'reserveVaccine' && <VaccineReservation />}
    </div>
  );
};

export default UserDashboard;
