'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilCard from '../sub/ProfilCard';
import { FaRegUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function TalentMenu() {
    const [allUsers, setAllUsers] = useState<any[]>([]); // Stocke tous les utilisateurs
    const [displayedUsers, setDisplayedUsers] = useState<any[]>([]); // Stocke les utilisateurs à afficher
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cvs/');
            setAllUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erreur API :', error);
            setAllUsers(["Une erreur est survenue lors de la récupération des utilisateurs."]);
        }
    };

    useEffect(() => {
        // Met à jour les utilisateurs affichés à chaque changement de page ou des données
        updateDisplayedUsers();
    }, [allUsers, currentPage]);

    const updateDisplayedUsers = () => {
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        setDisplayedUsers(allUsers.slice(startIndex, endIndex));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(allUsers.length / usersPerPage)));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };


    return (
        <div>
            <button type='button' className=" ml-[30%] relative flex justify-between items-center rounded-lg border border-blue-500 bg-white px-4 py-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={getAllUsers}>
                <div className="flex items-center justify-between">
                    <div className="rounded-lg border-2 border-[#165b77] p-1 mr-2"> {/* Cercle bleu pour l'icône */}
                        < FaRegUserCircle className='text-[#165b77]' />
                    </div>
                    <span className="text-gray-600">Recherche talent        </span>
                </div>
                <div className=" ml-3 border-2 rounded-lg border-yellow-400   p-1 "> {/* Loupe à droite */}
                    <FaSearch className='text-yellow-500' />
                </div>
            </button>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                {displayedUsers.length > 0 ? (
                    displayedUsers.map((user: any) => (
                        <ProfilCard
                            key={user.candidat}
                            user_id={user.candidat}
                            nom_prenom={user.nom_prenom}
                            mail={user.mail}
                            numero_tlfn={user.numero_tlfn}
                            profil={user.profil}
                            competences={user.competences}
                            resume_cv={user.resume_cv}
                            disponibilite={user.disponibilite}
                            domaine_etude={user.domaine_etude}
                        />
                    ))
                ) : (
                    <p>Aucun utilisateur trouvé.</p>
                )}
            </div>

            {/* Pagination */}
            {allUsers.length > usersPerPage && ( // n'affiche la pagination que s'il y a plus d'une page
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(allUsers.length / usersPerPage)}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
}