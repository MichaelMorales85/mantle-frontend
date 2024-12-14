import React from "react";
import { vaccineList } from "../data/vaccineData";

const VaccineReservation = () => {
    return (
        <div className="p-6 min-h-screen bg-blue-600 text-white">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r  text-white to-green-400">
                Vaccine Reservation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vaccineList.map((vaccine) => (
                    <div
                        key={vaccine.id}
                        className="bg-blue-500 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                        style={{ minHeight: "400px" }} // Ensuring fixed height
                    >
                        {/* Image Section */}
                        <div className="flex-shrink-0">
                            <img
                                src={vaccine.image}
                                alt={vaccine.name}
                                className="rounded-lg mb-4 w-full h-48 object-cover"
                            />
                        </div>

                        {/* Vaccine Info Section */}
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold mb-3 text-white truncate">
                                {vaccine.name}
                            </h3>
                            <p className="text-sm text-gray-200 line-clamp-3">
                                {vaccine.description || "No description available."}
                            </p>
                        </div>

                        {/* Reserve Button */}
                        <div className="mt-6">
                            <button
                                className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
                                onClick={() => alert(`You have reserved ${vaccine.name}`)}
                            >
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VaccineReservation;
