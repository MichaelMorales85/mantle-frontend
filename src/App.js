import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registrar from './components/Registrar';
import UserDashboard from './components/UserDashboard';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
