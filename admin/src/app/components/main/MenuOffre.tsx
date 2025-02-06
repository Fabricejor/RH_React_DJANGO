import React, { useState, useEffect } from 'react';

import { BsThreeDots } from "react-icons/bs";
import { FaFolderPlus } from "react-icons/fa";

import axios from 'axios';
import { useRouter } from 'next/navigation'

import Link from 'next/link';
//autres composants :
import JobsForm from './JobsForm'; // Import JobForm.tsx

interface Offre {
    id_offre: number;
    titre: string;
    entreprise: string;
    description: string;
    type_contrat: string;
}

const MenuOffre: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
    const [Offres, setOffres] = useState<Offre[]>([]);
    const getAllOffres = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/offers/');
            setOffres(Array.isArray(response.data) ? response.data : []);
            
        } catch (error) {
            console.error('Erreur API :', error);
            setOffres([]);
        }
    }
    // Fetch data on component mount (initial render)
    useEffect(() => {
        getAllOffres();
    }, []); // Empty dependency array ensures fetching only once

    const handleOpenPopup = () => {
        setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
    };

    return (
        <div className="p-8 bg-white"> {/* Marge intérieure et fond blanc */}
            <div className="flex justify-between items-center mb-6"> {/* En-tête avec bouton */}
                <div>
                    <h2 className="text-xl font-semibold">Mes Offres</h2>
                    <p className="text-gray-500">Vous pouvez créer des offres ici et les partager avec les candidats.</p>
                </div>
                <button type='button'
                    className="bg-[#165b77]  text-white text-xs font-medium py-2 px-4 rounded-xl flex flex-row items-center justify-between  hover:bg-teal-500 transition duration-200"
                    onClick={handleOpenPopup}
                >
                    <FaFolderPlus />    <p className='ml-2 text-white' >nouvelle offre</p>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3"> {/* Grille pour les offres */}
                {Offres.map((offre, index) => (
                    <Link 
                        href={`/compagny/dashboard/offre_details/${offre.id_offre}`}
                        key={index}
                        className="border rounded p-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer" 
                        // onClick={RedirectionOffreDetails}// Effet de survol
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-lg">{offre.titre}</h3>
                                <div className='flex flex-row'>
                                    <p className="text-xs text-gray-500">Type de contrat:</p>
                                    <p className="text-sm ml-2 ">{offre.type_contrat}</p>
                                </div>
                                <div className='flex flex-row'>
                                    <p className="text-xs text-gray-500">Societe:</p>
                                    <p className="text-sm ml-2 ">{offre.entreprise}</p>
                                </div>
                            </div>
                            <div className="relative inline-block text-left">
                                <span className="inline-flex w-full justify-center rounded-md bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                                    <BsThreeDots />
                                </span>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {isPopupOpen && <JobsForm onClose={handleOpenPopup} />} {/* Render JobForm conditionally */}
        </div>
    );
};

export default MenuOffre;