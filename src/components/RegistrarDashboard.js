import React from 'react';

const RegistrarDashboard = () => {
  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">登记员仪表盘</h2>
      <div>
        <h3 className="text-xl mb-2">Mint NFT</h3>
        {/* 这里添加 Mint NFT 的表单 */}
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="文档类型"
            className="p-2 bg-gray-700 rounded-lg"
          />
          <input
            type="text"
            placeholder="文档 ID"
            className="p-2 bg-gray-700 rounded-lg"
          />
          <input
            type="text"
            placeholder="以太坊地址"
            className="p-2 bg-gray-700 rounded-lg"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg">
            Mint NFT
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarDashboard;
