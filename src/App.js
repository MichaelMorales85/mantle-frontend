import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import RegistrarDashboard from './components/RegistrarDashboard';
import useWallet from './hooks/useWallet';

const App = () => {
  const { walletAddress, isRegistrar, connectWallet } = useWallet();

  return (
    <Router>
      <Routes>
        {/* 初始页面 */}
        <Route
          path="/"
          element={<Home walletAddress={walletAddress} connectWallet={connectWallet} />}
        />

        {/* 普通用户页面 */}
        <Route
          path="/user-dashboard"
          element={walletAddress && !isRegistrar ? <UserDashboard /> : <Home />}
        />

        {/* 登记员页面 */}
        <Route
          path="/registrar-dashboard"
          element={walletAddress && isRegistrar ? <RegistrarDashboard /> : <Home />}
        />
      </Routes>
    </Router>
  );
};

export default App;
