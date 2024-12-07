import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ walletAddress, isRegistrar }) => {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl font-bold">MedBadge</h1>
      <nav>
        <Link className="mx-2 hover:underline" to="/">首页</Link>
        {walletAddress && isRegistrar && (
          <Link className="mx-2 hover:underline" to="/registrar">登记员</Link>
        )}
        {walletAddress && (
          <Link className="mx-2 hover:underline" to="/dashboard">仪表盘</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
