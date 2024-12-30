import React from 'react';
import { BsThreeDots } from "react-icons/bs";
import { FaFolderPlus } from "react-icons/fa";
interface Offre {
    titre: string;
    dateMiseAJour: string;
    nombreCandidats: string;
}

const MenuOffre: React.FC = () => {
    const offres: Offre[] = [
        {
            titre: 'test',
            dateMiseAJour: 'Mis à jour il y a un mois',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'python dev gtp',
            dateMiseAJour: 'Mis à jour il y a quelques secondes',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'devops',
            dateMiseAJour: 'Mis à jour il y a quelques secondes',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'data scientist',
            dateMiseAJour: 'Mis à jour il y a quelques secondes',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'test',
            dateMiseAJour: 'Mis à jour il y a un mois',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'python dev gtp',
            dateMiseAJour: 'Mis à jour il y a quelques secondes',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'devops',
            dateMiseAJour: 'Mis à jour il y a quelques secondes',
            nombreCandidats: 'Aucun candidat',
        },
        {
            titre: 'data scientist',
            dateMiseAJour: 'Mis à jour il y a quelques secondes',
            nombreCandidats: 'Aucun candidat',
        },
        // Ajoutez d'autres offres ici
    ];

    return (
        <div className="p-8 bg-white"> {/* Marge intérieure et fond blanc */}
            <div className="flex justify-between items-center mb-6"> {/* En-tête avec bouton */}
                <div>
                    <h2 className="text-xl font-semibold">Offres</h2>
                    <p className="text-gray-500">Vous pouvez créer des offres ici et les partager avec les candidats.</p>
                </div>
                <button type='button' className="bg-[#165b77]  text-white text-xs font-medium py-2 px-4 rounded-xl flex flex-row items-center justify-between  hover:bg-teal-500 transition duration-200">
                    <FaFolderPlus />    <p className='ml-2 text-white' >new offer</p>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3"> {/* Grille pour les offres */}
                {offres.map((offre, index) => (
                    <div
                        key={index}
                        className="border rounded p-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer" // Effet de survol
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-lg">{offre.titre}</h3>
                                <p className="text-sm text-gray-500">{offre.dateMiseAJour}</p>
                                <p className="text-sm text-gray-500">{offre.nombreCandidats}</p>
                            </div>
                            <div className="relative inline-block text-left">
                                <span className="inline-flex w-full justify-center rounded-md bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                                    <BsThreeDots />
                                </span>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuOffre;