import React, { useState } from "react";
import MyNFTs from "./MyNFTs";
import VaccineReservation from "./VaccineReservation";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("myNFTs");

  return (
    <div className="min-h-screen bg-blue-600 text-white flex flex-col items-center py-10">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r text-white to-green-400">
        User Dashboard
      </h2>

      {/* Tabs */}
      <div className="flex space-x-6 mb-10">
        <button
          className={`px-8 py-3 rounded-full font-semibold text-lg ${activeTab === "myNFTs"
            ? "bg-green-500 shadow-lg"
            : "bg-blue-700 hover:bg-blue-800"
            } transition duration-300 transform hover:scale-105`}
          onClick={() => setActiveTab("myNFTs")}
        >
          My NFTs
        </button>
        <button
          className={`px-8 py-3 rounded-full font-semibold text-lg ${activeTab === "reserveVaccine"
            ? "bg-green-500 shadow-lg"
            : "bg-blue-700 hover:bg-blue-800"
            } transition duration-300 transform hover:scale-105`}
          onClick={() => setActiveTab("reserveVaccine")}
        >
          Reserve Vaccine
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-6xl mx-auto">
        {activeTab === "myNFTs" && <MyNFTs />}
        {activeTab === "reserveVaccine" && <VaccineReservation />}
      </div>
    </div>
  );
};

export default UserDashboard;
