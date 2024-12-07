import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import RegistrarDashboard from './components/RegistrarDashboard';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isRegistrar, setIsRegistrar] = useState(false);

  return (
    <Router>
      <Routes>
        {/* 首页 */}
        <Route
          path="/"
          element={
            <Home
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
              isRegistrar={isRegistrar}
              setIsRegistrar={setIsRegistrar}
            />
          }
        />

        {/* 用户仪表盘 */}
        <Route
          path="/user-dashboard"
          element={
            walletAddress && !isRegistrar ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* 登记员仪表盘 */}
        <Route
          path="/registrar-dashboard"
          element={
            walletAddress && isRegistrar ? (
              <RegistrarDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
