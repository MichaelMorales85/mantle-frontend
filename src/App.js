import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import RegistrarDashboard from './components/RegistrarDashboard';
import { WalletProvider, useWalletContext } from './contexts/WalletContext';

// 包含路由逻辑的组件
const AppContent = () => {
  const { walletAddress, isRegistrar } = useWalletContext();

  return (
    <Routes>
      {/* 首页 */}
      <Route
        path="/"
        element={<Home />}
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
  );
};

// 主应用组件
const App = () => {
  return (
    <WalletProvider>
      <Router>
        <AppContent />
      </Router>
    </WalletProvider>
  );
};

export default App;
