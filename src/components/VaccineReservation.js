import React from 'react';
import { vaccineList } from '../data/vaccineData';

const VaccineReservation = () => {
    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">疫苗预约</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vaccineList.map((vaccine) => (
                    <div
                        key={vaccine.id}
                        className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={vaccine.image}
                            alt={vaccine.name}
                            className="rounded-md mb-4 w-full"
                        />
                        <h3 className="text-xl font-bold mb-2">{vaccine.name}</h3>
                        <p className="text-sm mb-4">{vaccine.description}</p>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
                            onClick={() => alert(`预约 ${vaccine.name}`)}
                        >
                            预约
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VaccineReservation;
