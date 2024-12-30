import React from 'react';

import { IoMdOptions } from "react-icons/io";
interface Customer {
    name: string;
    email: string;
    amount: number;
}

const CalculSimilarity: React.FC = () => {
    const customers: Customer[] = [
        { name: 'MAREME NIANG ', email: 'niangmariameniang@gmail.com', amount: 98 },
        { name: 'ROSINETE FERNANDO DIAS', email: 'magdamaicy@gmail.com', amount: 67 },
        { name: 'Awa Cheikh NDIAYE', email: 'evacheikh1996@gmail.com', amount: 67 },
        { name: 'DUVAL PEDREL BANZOUZI', email: 'Duval.banz@gmail.com', amount: 56 },
        { name: 'Khadidiatou Diao', email: 'khadidiatoudiao139@gmail.com', amount: 37 },
        
    ];

    return (
        <div className="bg-white p-8">
            <div className="flex space-x-4 mb-8">
                <div className="w-1/2">
                    <label htmlFor="candidat" className="block text-sm font-medium text-gray-700 mb-1">
                        Candidat
                    </label>
                    <select
                        id="candidat"
                        className="mt-1 block w-full rounded-md border-2 focus:border-[#165b77] bg-white py-2 px-3 shadow-sm focus:outline-2 focus:outline-[#165b77] focus:ring-[#165b77] sm:text-sm"
                        // multiple
                        size={1}
                    >
                        <option>Tous</option>
                        {/* Options du select */}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Selectioné au moins un candidat</p>
                </div>
                <div className="w-1/2">
                    <label htmlFor="offre" className="block text-sm font-medium text-gray-700 mb-1">
                        Offre
                    </label>
                    <select
                        id="offre"
                        className="mt-1 block w-full rounded-md border-2  bg-white py-2 px-3 shadow-sm focus:border-[#165b77] focus:outline-1 focus:outline-[#165b77] focus:ring-[#165b77] sm:text-sm"
                    >
                        <option>Develloppeur Odoo</option>
                        <option>Develloppeur fullstack</option>
                        {/* Options du select */}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">veuillez Selectioné une offre</p>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Voici les résultat</h3>
                    <span className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        <IoMdOptions />
                    </span>
                </div>
                <ul className="divide-y  divide-gray-200">
                    {customers.map((customer, index) => (
                        <li key={index} className="py-4">
                            <div className="flex items-center space-x-10  ">
                                {/* Image du profil (omis pour simplifier) */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{customer.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                                </div>
                                <div>
                                    {customer.amount > 60 ?
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                            {customer.amount}%
                                        </span>
                                        :
                                        <span className="inline-flex items-center rounded-full bg-red-200 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                            {customer.amount}%
                                        </span>
                                    }

                                </div>
                                <div className='button-container'>
                                    <button type='button' className="bg-[#165b77]  text-white text-xs font-medium py-2 px-4 rounded-xl flex flex-row items-center justify-between  hover:bg-teal-500 transition duration-200">
                                        voir plus
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CalculSimilarity;