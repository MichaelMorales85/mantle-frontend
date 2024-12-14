import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ walletAddress, isRegistrar }) => {
  return (
    <header className="p-4 bg-blue-600 text-white flex items-center justify-between shadow-md">
      {/* Logo / Brand */}
      <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
        MedBadge
      </h1>

      {/* Navigation Links */}
      <nav className="flex space-x-6 text-lg">
        <Link
          className="hover:text-green-400 transition-colors duration-200"
          to="/"
        >
          Home
        </Link>
        {walletAddress && isRegistrar && (
          <Link
            className="hover:text-green-400 transition-colors duration-200"
            to="/registrar"
          >
            Registrar
          </Link>
        )}
        {walletAddress && (
          <Link
            className="hover:text-green-400 transition-colors duration-200"
            to="/dashboard"
          >
            Dashboard
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
