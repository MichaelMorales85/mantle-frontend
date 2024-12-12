import React, { useState } from "react";
import MyNFTs from "./MyNFTs";
import VaccineReservation from "./VaccineReservation";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("myNFTs");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center py-10">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        User Dashboard
      </h2>

      {/* Tabs */}
      <div className="flex space-x-6 mb-10">
        <button
          className={`px-8 py-3 rounded-full font-semibold text-lg ${activeTab === "myNFTs"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
            } transition duration-300 transform hover:scale-105`}
          onClick={() => setActiveTab("myNFTs")}
        >
          My NFTs
        </button>
        <button
          className={`px-8 py-3 rounded-full font-semibold text-lg ${activeTab === "reserveVaccine"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
            } transition duration-300 transform hover:scale-105`}
          onClick={() => setActiveTab("reserveVaccine")}
        >
          Reserve Vaccine
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl">
        {activeTab === "myNFTs" && <MyNFTs />}
        {activeTab === "reserveVaccine" && <VaccineReservation />}
      </div>
    </div>
  );
};

export default UserDashboard;
