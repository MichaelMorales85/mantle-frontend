import React from 'react';
import { vaccineList } from '../data/vaccineData';

const VaccineReservation = () => {
    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Vaccine Reservation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vaccineList.map((vaccine) => (
                    <div
                        key={vaccine.id}
                        className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={vaccine.image}
                            alt={vaccine.name}
                            className="rounded-lg mb-4 w-full h-48 object-cover"
                        />
                        <h3 className="text-2xl font-bold mb-3 text-gradient bg-clip-text from-blue-400 to-purple-500">
                            {vaccine.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-6">{vaccine.description}</p>
                        <button
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
                            onClick={() => alert(`You have reserved ${vaccine.name}`)}
                        >
                            Reserve
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VaccineReservation;
