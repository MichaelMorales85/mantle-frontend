import React, { useState } from 'react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('myNFTs');

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">用户仪表盘</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'myNFTs' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('myNFTs')}
        >
          My NFTs
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'reserveVaccine' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('reserveVaccine')}
        >
          预约疫苗
        </button>
      </div>

      {activeTab === 'myNFTs' && <div>这是 My NFTs 内容</div>}
      {activeTab === 'reserveVaccine' && <div>这是预约疫苗内容</div>}
    </div>
  );
};

export default UserDashboard;
